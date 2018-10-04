/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Vector3 } from 'three';
import { BallMesh } from './BallMesh';

const FRICTION = 2;
const STOP_FRICTION_VEL = 10;

function Ball(scene) {
    //Ball atts
    var velocity = new Vector3();
    var direction = new Vector3();
    var forceImpulse = 0;
    //Ball Components
    const mesh = BallMesh();
    //Components to the scene
    scene.add(mesh);
    //setters
    this.shootBall = function (x, y, force) {
        direction.x = x;
        direction.y = y;
        direction.normalize();
        forceImpulse = force;
        velocity.y += direction.y * forceImpulse;
        velocity.x += direction.x * forceImpulse;
    };
    //Getters
    this.getMesh = function () {
        return mesh;
    };
    this.getMaterials = function () {
        return mesh.children[0];
    };
    //Controls
    this.translateX = function (x) {
        mesh.translateX(x);
    };
    this.translateY = function (y) {
        mesh.translateY(y);
    };
    var stopMovement = false;
    this.update = function (dt) {
        //Ball movement

        if (velocity.x != 0) {
            if ((velocity.x > 0 && velocity.x <= STOP_FRICTION_VEL) || (velocity.x < 0 && velocity.x >= -STOP_FRICTION_VEL))
                stopMovement = true;
            else
                velocity.x -= velocity.x * FRICTION * dt;
        }
        if (velocity.y != 0) {
            if ((velocity.y > 0 && velocity.y <= STOP_FRICTION_VEL) || (velocity.y < 0 && velocity.y >= -STOP_FRICTION_VEL))
                stopMovement = true;
            else
                velocity.y -= velocity.y * FRICTION * dt;
        }

        if (stopMovement) {
            velocity.x = 0;
            velocity.y = 0;
            stopMovement = false;
        }
        if (velocity.x != 0) {
            this.translateX(velocity.x * dt);
        }
        if (velocity.y != 0) {
            this.translateY(velocity.y * dt);
        }

    };
};

export { Ball };