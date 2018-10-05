/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Scene, Color, PerspectiveCamera } from 'three';
import { Player } from './../assets/Player/Player';
import { Ball } from './../assets/Ball/Ball';
import { Court } from './../assets/environment/Court/Court';

function PrincipalScene() {
    const scene = new Scene();
    scene.background = new Color("#000");
    var aspectRatio = window.innerWidth / window.innerHeight;
    const fieldOfView = 45;
    const nearPlane = 1;
    const farPlane = 500;
    const cameraDistanceToPlayer = 250;
    const Camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    Camera.position.set(0, 0, cameraDistanceToPlayer);
    Camera.lookAt(0, 0, 0);
    scene.add(Camera);
    const ball = new Ball(scene);
    const player = new Player(scene, Camera, ball);
    const court = new Court(scene);
    //player.getMesh().position.set(-50,0,0);

    this.getScene = function () {
        return scene;
    };
    this.getCamera = function () {
        return Camera;
    };
    const SceneSubjects = [
        player,
        ball,
        court,
    ];

    this.update = function (dt) {
        //console.log("DT PrincipalScene" + dt);
        for (let i = 0; i < SceneSubjects.length; i++)
            SceneSubjects[i].update(dt);
    };
};
export { PrincipalScene };

