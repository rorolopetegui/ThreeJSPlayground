/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import io from 'socket.io-client';
import { Player } from './../assets/Player/Player';
import { Ball } from './../assets/Ball/Ball';



function Network(scene, court) {
    var self = this;
    var player;
    var Scene = scene;
    var gameBall;
    //var court = Scene.getObjectByName("Court");
    var SceneSubjects = [
    ];

    var socket = io.connect('https://somedodgeball.glitch.me');

    socket.emit('Initialize');

    socket.on('Player-Data', function (data) {
        self.initializeSubjects(data);
    });

    socket.on('Ball-Update', function (data) {
        if (gameBall !== undefined)
            self.moveBall(data);
    });

    this.moveBall = function (data) {
        //console.log(data);
        gameBall.getMesh().position.set(data.position.x, data.position.y, 0);
    };
    this.initializeSubjects = function (data) {
        if (gameBall === undefined) {
            gameBall = new Ball(Scene, data.subjects.gameBall);
            SceneSubjects.push(gameBall);
        }
        if (player === undefined) {
            var auxPlayer = data.subjects.players[data.id];
            player = new Player(auxPlayer.id, auxPlayer.position, gameBall, Scene, true);
            SceneSubjects.push(player);
        }
        for (var otherPlayer in data.subjects.players) {
            if (otherPlayer.id !== player.id) {
                SceneSubjects.push(
                    new Player(otherPlayer.id, otherPlayer.position, scene, false)
                );
            }
        };
    };

    this.update = function (dt) {
        for (let i = 0; i < SceneSubjects.length; i++)
            SceneSubjects[i].update(dt);
    };
};

export { Network };