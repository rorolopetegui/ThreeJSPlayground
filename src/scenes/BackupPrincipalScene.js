/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Scene, Color, PerspectiveCamera } from 'three';
import { Player } from './../assets/Player/Player';
import { Ball } from './../assets/Ball/Ball';
import { Court } from './../assets/environment/Court/Court';

const FIELD_OF_VIEW = 45;
const NEAR_PLANE = 1;
const FAR_PLANE = 500;
const CAM_DISTANCE_TO_PLAYER = 250;
const DISTANCE_SPAWN_PLAYERS = 40;

var playersTeam1 = 0;
var playersTeam2 = 0;

var PlayerIdNext = 0;

function assignTeam(player, court, scene) {
    var assignedTeam;
    if (playersTeam1 === playersTeam2) {
        assignedTeam = Math.round(Math.random());
        assignedTeam++;
        player.team = assignedTeam;
        if (assignedTeam === 1)
            playersTeam1++;
        else
            playersTeam2++;
    } else {
        if (playersTeam1 < playersTeam2) {
            player.team = 1;
            playersTeam1++;
        } else {
            player.team = 2;
            playersTeam2++;
        }
    }
    assignPosition(player, court);
};
function getRandomPosition() {
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    return Math.round(Math.random() * (DISTANCE_SPAWN_PLAYERS) * plusOrMinus);
  }
function assignPosition(player, court) {
    var x = 0;
    var y = 0;
    //Team 1
    if (player.team === 1) {
        var courtTeamOne = court.getTeamOne();
        x = courtTeamOne.position.x;
        y = courtTeamOne.position.y;
    } else {
        //Team 2
        var courtTeamTwo = court.getTeamTwo();
        x = courtTeamTwo.position.x;
        y = courtTeamTwo.position.y;
    }
    x += getRandomPosition();
    y += getRandomPosition();
    player.getMesh().position.set(x, y, 0);
};

var aspectRatio = window.innerWidth / window.innerHeight;
function PrincipalScene() {
    const scene = new Scene();
    scene.background = new Color("#000");
    const Camera = new PerspectiveCamera(FIELD_OF_VIEW, aspectRatio, NEAR_PLANE, FAR_PLANE);
    Camera.name = "Camera";
    Camera.position.set(0, 0, CAM_DISTANCE_TO_PLAYER);
    Camera.lookAt(0, 0, 0);
    scene.add(Camera);
    //Need to declare the environment first cause the entities in it may be use some of the atts that court have
    const court = new Court(scene);
    const ball = new Ball(scene);
    const SceneSubjects = [
        court,
        ball,
    ];
    var Players = [];

    //Load players
    const player = new Player(PlayerIdNext,scene, Camera, ball, true);
    PlayerIdNext++;
    Players.push(player);
    //Some bots
    Players.push(new Player(PlayerIdNext,scene, Camera, ball, false));
    PlayerIdNext++;
    Players.push(new Player(PlayerIdNext,scene, Camera, ball, false));
    PlayerIdNext++;
    Players.push(new Player(PlayerIdNext,scene, Camera, ball, false));
    PlayerIdNext++;
    Players.push(new Player(PlayerIdNext,scene, Camera, ball, false));
    PlayerIdNext++;
    Players.push(new Player(PlayerIdNext,scene, Camera, ball, false));
    PlayerIdNext++;
    //Assing team and position to each player 
    for (let i = 0; i < Players.length; i++) {
        assignTeam(Players[i], court, scene);
        SceneSubjects.push(Players[i]);
    }


    this.getScene = function () {
        return scene;
    };
    this.getCamera = function () {
        return Camera;
    };
    

    this.update = function (dt) {
        //console.log("DT PrincipalScene" + dt);
        for (let i = 0; i < SceneSubjects.length; i++)
            SceneSubjects[i].update(dt);
    };
};
export { PrincipalScene };

