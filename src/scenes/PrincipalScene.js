/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Scene, Color, PerspectiveCamera } from 'three';
import { Court } from './../assets/environment/Court/Court';
import { Network } from '../scripts/Network';

const FIELD_OF_VIEW = 45;
const NEAR_PLANE = 1;
const FAR_PLANE = 500;
const CAM_DISTANCE_TO_PLAYER = 250;


var aspectRatio = window.innerWidth / window.innerHeight;
function PrincipalScene() {
    const scene = new Scene();
    scene.background = new Color("#000");
    const Camera = new PerspectiveCamera(FIELD_OF_VIEW, aspectRatio, NEAR_PLANE, FAR_PLANE);
    Camera.name = "Camera";
    Camera.position.set(0, 0, CAM_DISTANCE_TO_PLAYER);
    Camera.lookAt(0, 0, 0);
    scene.add(Camera);
    const court = new Court(scene);
    const network = new Network(scene, court);
    

    this.getScene = function () {
        return scene;
    };
    this.getCamera = function () {
        return Camera;
    };
    

    this.update = function (dt) {
        network.update(dt);
    };
};
export { PrincipalScene };

