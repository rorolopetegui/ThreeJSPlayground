/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { PerspectiveCamera, Mesh, CircleGeometry, MeshBasicMaterial } from 'three';

function Player(scene) {
    var aspectRatio = window.innerWidth / window.innerHeight;
    const fieldOfView =45;
    const nearPlane = 1;
    const farPlane = 500;
    const cameraDistanceToPlayer = 200;
    const geometry = new CircleGeometry(5, 32);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    const mesh = new Mesh(geometry, material);
    //mesh.position.set(0, 0, -20);
    //var Camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    const Camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    Camera.position.set(0, 0, cameraDistanceToPlayer);
    Camera.lookAt(0, 0, 0);
    scene.add(mesh);
    scene.add(Camera);
    this.getCamera = function () {
        return Camera;
    };
    this.update = function (dt) {

        //console.log("Dt Player: " + dt);
        
    };
};


export { Player };