/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Vector3 } from 'three';
import { BallMesh } from './BallMesh';

const FRICTION = 1;
const STOP_FRICTION_VEL = 5;
const OUT_OF_BOUNDS = false;
const REFLECTION_DISTANCE = 10;

var distanceToOutOfBounds;
var mostCloseLine;
//Functions
function calculateReflection(ball, courtLines, velocity) {
    var vel = velocity;
    if (!OUT_OF_BOUNDS) {
        checkOutOfBounds(courtLines, ball);
        if(REFLECTION_DISTANCE >= distanceToOutOfBounds){
            
        }
    }
    return vel;
};

function checkOutOfBounds(courtLines, ball) {
    var distance = 0;
    distanceToOutOfBounds = 1000;
    var dx = 100;
    var dy = 100;
    courtLines.children.forEach(function (line) {
        if (line.name !== "COURT_LINES_MID_MESH") {
            if (line.name === "COURT_LINES_TOP_MESH" || line.name === "COURT_LINES_BOTTOM_MESH") {
                dx = 0;
                dy = ball.position.y - line.position.y;
            }else if (line.name === "COURT_LINES_LEFT_MESH" || line.name === "COURT_LINES_RIGHT_MESH") {
                dx = ball.position.x - line.position.x;
                dy = 0;
            }
            
            distance = Math.sqrt(dx * dx + dy * dy);
            mostCloseLine = distanceToOutOfBounds > distance ? line : mostCloseLine;
            distanceToOutOfBounds = distanceToOutOfBounds > distance ? distance : distanceToOutOfBounds;
        }
    });
    return distance;
}

function Ball(scene) {
    //Helpers
    //Save Scene in case that needed
    var Scene = scene;
    var courtLines = Scene.getObjectByName("COURT_LINES");
    mostCloseLine = courtLines.getObjectByName("COURT_LINES_TOP_MESH");
    //Ball atts
    var velocity = new Vector3();
    var direction = new Vector3();
    var forceImpulse = 0;
    var stopMovement = false;
    //Ball Components
    const mesh = BallMesh();
    mesh.name = "Ball";
    //Components to the scene
    Scene.add(mesh);
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
    this.stopMovement = function () {
        stopMovement = true;
    };

    this.update = function (dt) {
        //Ball movement
        if (velocity.x != 0 || velocity.y != 0) {
            velocity = calculateReflection(mesh, courtLines, velocity);
        }
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