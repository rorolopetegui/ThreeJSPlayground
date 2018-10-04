/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Vector3 } from 'three';
import { PlayerController } from '../../scripts/PlayerController';
import { PlayerMesh } from './PlayerMesh';

//Game Constants
const SHOOT_MAX_TIME = 0.86;
const SHOOT_MAX_FORCE = 600;
const SHOOT_MIN_FORCE = 5;
const ACCELERATION = 800;
const FRICTION = 10;


function Player(scene, Camera, ball) {
    //Saves the ball so we can call static methods in it
    const gameBall = ball;
    //Controls that needs to be constantly checked
    var distanceToBall;
    var gotBall = false;
    //Player Attributes 
    var moveUp = false;
    var moveDown = false;
    var moveRight = false;
    var moveLeft = false;
    var velocity = new Vector3();
    var direction = new Vector3();
    var isShooting = false;
    var shootingCounter = 0;
    var shootForce = 0;

    //Player Attributes 
    //Player Components
    const mesh = PlayerMesh();

    //Components to the scene
    scene.add(mesh);
    //Components to the scene

    PlayerController(this, Camera);

    //Controls
    this.onMouseDown = function () {
        if (gotBall) {
            
            isShooting = true;
        }
    };
    this.onMouseUp = function (mouseX, mouseY) {
        if (gotBall) {
            //Performs shoot
            shootForce = (shootingCounter * SHOOT_MAX_FORCE) / SHOOT_MAX_TIME;
            shootForce = shootForce >= SHOOT_MIN_FORCE ? shootForce : SHOOT_MIN_FORCE;
            //console.log("SHOOTING FORCE: " + shootForce);
            gameBall.shootBall(mouseX,mouseY,shootForce);
            //Reset control vars
            isShooting = false;
            gotBall = false;
            shootingCounter = 0;
        } else {
            if (distanceToBall < 100) {
                gotBall = true;
            }
        }
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
        if (gotBall) {
            gameBall.getMesh().translateX(x);
        }
        //mesh.position.set(mesh.position.x + x, mesh.poisition.y, mesh.position.z);
    };
    this.translateY = function (y) {
        mesh.translateY(y);
        if (gotBall) {
            gameBall.getMesh().translateY(y);
        }
        //mesh.position.set(mesh.position.x, mesh.poisition.y + y, mesh.position.z);
    };
    //Getters
    this.getMesh = function () {
        return mesh;
    };
    this.getMaterials = function () {
        return mesh.children[0];
    };
    this.getGameBall = function () {
        return gameBall;
    };

    this.update = function (dt) {
        //Throwing ball mechanics
        if (isShooting) {
            if (shootingCounter <= SHOOT_MAX_TIME) {
                shootingCounter += dt;
            }
        }

        distanceToBall = mesh.position.distanceToSquared(gameBall.getMesh().position);
        //Player movement
        if (velocity.x != 0) {
            if ((velocity.x > 0 && velocity.x <= 0.1) || (velocity.x < 0 && velocity.x >= -0.1))
                velocity.x = 0;
            else
                velocity.x -= velocity.x * FRICTION * dt;
        }
        if (velocity.y != 0) {
            if ((velocity.y > 0 && velocity.y <= 0.1) || (velocity.y < 0 && velocity.y >= -0.1))
                velocity.y = 0;
            else
                velocity.y -= velocity.y * FRICTION * dt;
        }


        direction.y = Number(moveDown) - Number(moveUp);
        direction.x = Number(moveLeft) - Number(moveRight);
        direction.normalize(); // this ensures consistent movements in all directions
        if (moveUp || moveDown) {
            velocity.y -= direction.y * ACCELERATION * dt;

        }
        if (moveLeft || moveRight) {
            velocity.x -= direction.x * ACCELERATION * dt;
        }
        if (velocity.x != 0)
            this.translateX(velocity.x * dt);
        if (velocity.y != 0)
            this.translateY(velocity.y * dt);

        //console.log("Dt Player: " + dt);
    };
};


export { Player };