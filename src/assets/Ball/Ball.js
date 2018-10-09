/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Vector2, Vector3 } from 'three';
import { BallMesh } from './BallMesh';

const FRICTION = 1;
const STOP_FRICTION_VEL = 3;
const OUT_OF_BOUNDS = false;
const REFLECTION_DISTANCE = 7.5;
const REFLECTION_DISTANCE_GRACE = 8.5

var distanceToOutOfBounds;
var mostCloseLine;
//Functions
function checkOutOfBounds(courtLines, vec) {
    var distance = 0;
    distanceToOutOfBounds = 1000;
    var dx = 100;
    var dy = 100;
    courtLines.children.forEach(function (line) {
        if (line.name !== "COURT_LINES_MID_MESH") {
            if (line.name === "COURT_LINES_TOP_MESH" || line.name === "COURT_LINES_BOTTOM_MESH") {
                dx = 0.5;
                dy = vec.y - line.position.y;
            } else if (line.name === "COURT_LINES_LEFT_MESH" || line.name === "COURT_LINES_RIGHT_MESH") {
                dx = vec.x - line.position.x;
                dy = 0.5;
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
    this.translate = function (x, y) {
        if (!OUT_OF_BOUNDS) {
            var vec = new Vector2((mesh.position.x + x), (mesh.position.y + y));
            //Loads the most close line to the ball using the next position of the ball
            checkOutOfBounds(courtLines, vec);

            if (distanceToOutOfBounds < REFLECTION_DISTANCE && distanceToOutOfBounds < REFLECTION_DISTANCE_GRACE) {
                if (mostCloseLine.name === "COURT_LINES_LEFT_MESH" || mostCloseLine.name === "COURT_LINES_RIGHT_MESH") {
                    x *= -1;
                    velocity.x *= -1;
                } else if (mostCloseLine.name === "COURT_LINES_TOP_MESH" || mostCloseLine.name === "COURT_LINES_BOTTOM_MESH") {
                    y *= -1;
                    velocity.y *= -1;
                }

            }
        }
        mesh.translateX(x);
        mesh.translateY(y);
    };
    this.stopMovement = function () {
        stopMovement = true;
    };

    this.update = function (dt) {
        //Ball movement
        if (velocity.x != 0) {
            velocity.x -= velocity.x * FRICTION * dt;
        }
        if (velocity.y != 0) {
            velocity.y -= velocity.y * FRICTION * dt;
        }
        //If this isn't here, it will never stop
        if ((velocity.x > 0 && velocity.x <= STOP_FRICTION_VEL) || (velocity.x < 0 && velocity.x >= -STOP_FRICTION_VEL)) {
            if ((velocity.y > 0 && velocity.y <= STOP_FRICTION_VEL) || (velocity.y < 0 && velocity.y >= -STOP_FRICTION_VEL))
                stopMovement = true;
        }

        if (stopMovement) {
            velocity.x = 0;
            velocity.y = 0;
            stopMovement = false;
        }

        if (velocity.x != 0 || velocity.y != 0) {
            this.translate(velocity.x * dt, velocity.y * dt);
        }
    };
};

export { Ball };