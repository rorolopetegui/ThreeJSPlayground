/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Scene, Color, PerspectiveCamera } from 'three';
import { Player } from './../assets/Player/Player';
import { Court } from './../assets/environment/Court/Court';
import { Ball } from './../assets/Ball/Ball';

const FIELD_OF_VIEW = 45;
const NEAR_PLANE = 1;
const FAR_PLANE = 500;
const CAM_DISTANCE_TO_PLAYER = 250;


var PlayerIdNext = 0;

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
    var Players = [];
    const player = new Player(PlayerIdNext,scene, Camera, ball, true);
    PlayerIdNext++;
    Players.push(player);
    var SceneSubjects = [
        court,
        player,
    ];
    

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

