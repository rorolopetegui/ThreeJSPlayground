/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Scene, Color, PerspectiveCamera } from 'three';
import { Test } from './../assets/Test';

function TestScene() {
    const scene = new Scene();
    scene.background = new Color("#000");
    var aspectRatio = window.innerWidth / window.innerHeight;
    const fieldOfView = 45;
    const nearPlane = 1;
    const farPlane = 500;
    const cameraDistanceToPlayer = 250;
    const Camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    Camera.name = "Camera";
    Camera.position.set(0, 0, cameraDistanceToPlayer);
    Camera.lookAt(0, 0, 0);
    scene.add(Camera);
    //Need to declare the environment first cause the entities in it may be use some of the atts that court have
    const test = new Test(scene);
    //Need to declare the environment first cause the entities in it may be use some of the atts that court have
    
    //player.getMesh().position.set(-50,0,0);

    this.getScene = function () {
        return scene;
    };
    this.getCamera = function () {
        return Camera;
    };
    const SceneSubjects = [
        test,
    ];

    this.update = function (dt) {
        //console.log("DT PrincipalScene" + dt);
        for (let i = 0; i < SceneSubjects.length; i++)
            SceneSubjects[i].update(dt);
    };
};
export { TestScene };

