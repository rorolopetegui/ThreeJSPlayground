/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { PerspectiveCamera, Mesh, CircleGeometry, MeshBasicMaterial, Vector3 } from 'three';
import { PlayerController } from '../scripts/PlayerController';

function Player(scene) {
    //Player Attributes 
    const acceleration = 1000;
    const maxVelocity = 50;
    const friction = 10;
    var aspectRatio = window.innerWidth / window.innerHeight;
    const fieldOfView = 45;
    const nearPlane = 1;
    const farPlane = 500;
    const cameraDistanceToPlayer = 200;
    const playerSize = 5;
    const geometryTriangles = 32;
    //Player Attributes 
    //Player Components
    const geometry = new CircleGeometry(playerSize, geometryTriangles);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    const mesh = new Mesh(geometry, material);
    const Camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    Camera.position.set(0, 0, cameraDistanceToPlayer);
    Camera.lookAt(0, 0, 0);
    //Player Components
    //Components to the scene
    scene.add(mesh);
    scene.add(Camera);
    //Components to the scene
    //Controls
    PlayerController(this);
    var moveUp = false;
    var moveDown = false;
    var moveRight = false;
    var moveLeft = false;
    var velocity = new Vector3();
    var direction = new Vector3();
    //Controls
    this.getCamera = function () {
        return Camera;
    };
    this.getMesh = function () {
        return mesh;
    };
    this.moveUp = function (move) {
        moveUp = move;
    };
    this.moveDown = function (move) {
        moveDown = move;
    };
    this.moveRight = function (move) {
        moveRight = move;
    };
    this.moveLeft = function (move) {
        moveLeft = move;
    };
    this.translateX = function (x) {
        mesh.translateX(x);
        Camera.translateX(x);
    };
    this.translateY = function (y) {
        mesh.translateY(y);
        Camera.translateY(y);
    };

    this.update = function (dt) {
        if (velocity.x != 0) {
            if ((velocity.x > 0 && velocity.x <= 0.1) || (velocity.x < 0 && velocity.x >= -0.1))
                velocity.x = 0;
            else
                velocity.x -= velocity.x * friction * dt;
        }
        if (velocity.y != 0) {
            if ((velocity.y > 0 && velocity.y <= 0.1) || (velocity.y < 0 && velocity.y >= -0.1))
                velocity.y = 0;
            else
                velocity.y -= velocity.y * friction * dt;
        }


        direction.y = Number(moveDown) - Number(moveUp);
        direction.x = Number(moveLeft) - Number(moveRight);
        direction.normalize(); // this ensures consistent movements in all directions
        if (moveUp || moveDown) {
            velocity.y -= direction.y * acceleration * dt;
            if (velocity.y > maxVelocity && velocity.y > 0)
                velocity.y = maxVelocity;
            if (velocity.y < -maxVelocity && velocity.y < 0)
                velocity.y = -maxVelocity;
        }
        if (moveLeft || moveRight) {
            velocity.x -= direction.x * acceleration * dt;
            if (velocity.x > maxVelocity)
                velocity.x = maxVelocity;
            if (velocity.x < -maxVelocity && velocity.x < 0)
                velocity.x = -maxVelocity;
        }
        if (velocity.x != 0)
            this.translateX(velocity.x * dt);
        if (velocity.y != 0)
            this.translateY(velocity.y * dt);

        //console.log("Dt Player: " + dt);
    };
};


export { Player };