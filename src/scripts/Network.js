/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import io from 'socket.io-client';
import { Player } from './../assets/Player/Player';
import { Ball } from './../assets/Ball/Ball';



function Network(scene, court) {
    var initialize = false;
    var self = this;
    var player;
    var Scene = scene;
    var gameBall;
    //var court = Scene.getObjectByName("Court");
    var SceneSubjects = {};

    var socket = io.connect('https://somedodgeball.glitch.me');

    socket.emit('Initialize');

    socket.on('Player-Data', function (data) {
        self.initializeSubjects(data);
    });

    socket.on('Player-Joined', function (data) {
        self.createPlayer(data);
    });

    socket.on('Player-Disconnected', function (id) {
        self.deletePlayer(id);
    });

    socket.on('Ball-Update', function (data) {
        if (gameBall !== undefined)
            self.moveBall(data);
    });

    socket.on('Player-Moved', function (data) {
        self.movePlayer(data);
    });


    this.initializeSubjects = function (data) {
        if (gameBall === undefined) {
            gameBall = new Ball(Scene, data.subjects.gameBall);
            SceneSubjects["GameBall"] = gameBall;
        }
        if (player === undefined) {
            var auxPlayer = data.subjects.players[data.id];
            player = new Player(data.id, auxPlayer.position, gameBall, Scene, true);
            SceneSubjects[data.id] = player;
        }
        for (var idPlayer in data.subjects.players) {
            var otherPlayer = data.subjects.players[idPlayer];
            if (idPlayer !== player.ID) {
                var newPlayer = new Player(idPlayer, otherPlayer.position, gameBall, Scene, false);
                SceneSubjects[idPlayer] = newPlayer;
            }
        };
        initialize = true;
    };
    this.moveBall = function (data) {
        if (player === undefined) {
            gameBall.getMesh().position.set(data.position.x, data.position.y, 0);
        } else {
            if(!player.gotBall()){
                gameBall.getMesh().position.set(data.position.x, data.position.y, 0);
            }
        }
    };
    this.createPlayer = function (data) {
        var newPlayer = new Player(data.ID, data.position, gameBall, Scene, false);
        SceneSubjects[data.ID] = newPlayer;
    };
    this.deletePlayer = function (id) {
        if (!SceneSubjects[id]) return;
        Scene.remove(SceneSubjects[id].getMesh());
        delete SceneSubjects[id];
    };
    this.movePlayer = function (data) {
        if (!SceneSubjects[data.id]) return;
        var playerMesh = SceneSubjects[data.id].getMesh();
        playerMesh.position.set(data.x, data.y, playerMesh.position.z);;
    };

    function updatePosition() {
        if (initialize) {
            var playerMesh = player.getMesh();
            socket.emit('Player-Moved', { x: playerMesh.position.x, y: playerMesh.position.y });
        }
    };

    var CatchSendToServer = false;
    function updateActions() {
        if (initialize) {

            var catchAction = player.getCatchAction();
            if (catchAction && !CatchSendToServer) {
                CatchSendToServer = true;
                socket.emit('Player-Catching');
            }


            //reset control vars
            if (!catchAction)
                CatchSendToServer = false;
        }
    };

    this.update = function (dt) {
        updatePosition();
        updateActions();
        for (var idSubject in SceneSubjects) {
            var subject = SceneSubjects[idSubject];
            subject.update(dt);
        }
    };
};

export { Network };