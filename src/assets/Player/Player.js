/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Vector3, Vector2 } from 'three';
import { PlayerController } from '../../scripts/PlayerController';
import { PlayerMesh } from './PlayerMesh';

//Game Constants
const OUT_OF_BOUNDS = false;
const SHOOT_MAX_TIME = 0.86;
const SHOOT_MAX_FORCE = 600;
const SHOOT_MIN_FORCE = 5;
const ACCELERATION = 800;
//DASH PROPS
const DASH_VELOCITY = 300;
const DASH_COOLDOWN = 0.5;

const FRICTION = 10;
const DISTANCE_TO_OUT_OF_BOUNDS = 9;

//Functions
function checkDistanceToLine(line, vec) {
    var distance = 0;
    var dx = 100;
    var dy = 100;
    if (line.name === "COURT_LINES_TOP_MESH" || line.name === "COURT_LINES_BOTTOM_MESH") {
        dx = 1;
        dy = vec.y - line.position.y;
    } else if (line.name === "COURT_LINES_LEFT_MESH" || line.name === "COURT_LINES_RIGHT_MESH" || line.name === "COURT_LINES_MID_MESH") {
        dx = vec.x - line.position.x;
        dy = 1;
    }

    distance = Math.sqrt(dx * dx + dy * dy);

    return distance;
}

function Player(scene, Camera, ball) {
    //Save Scene in case that needed
    var Scene = scene;
    var courtLines = Scene.getObjectByName("COURT_LINES");
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
    var makeDash = false;
    var velocity = new Vector3();
    var direction = new Vector3();
    var isShooting = false;
    var shootingCounter = 0;
    var shootForce = 0;
    var dashActive = true;
    var isDashing = false;

    //Player Attributes 
    //Player Components
    const mesh = PlayerMesh();
    mesh.name = "Player";
    //Components to the scene
    Scene.add(mesh);

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
            gameBall.shootBall(mouseX, mouseY, shootForce);
            //Reset control vars
            isShooting = false;
            gotBall = false;
            shootingCounter = 0;
        } else {
            if (distanceToBall < 100) {
                gameBall.stopMovement();
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
    this.makeDash = function (dash) {
        if (dashActive)
            makeDash = dash;
    };
    this.translate = function (x, y) {
        //Performs checks if the player can move in that direction
        if (!OUT_OF_BOUNDS) {
            var vec = new Vector2((mesh.position.x + x), (mesh.position.y + y));
            if (x > 0) {
                if (checkDistanceToLine(courtLines.getObjectByName("COURT_LINES_RIGHT_MESH"), vec) <= DISTANCE_TO_OUT_OF_BOUNDS) {
                    velocity.x = 0;
                    x = 0;
                } else if (checkDistanceToLine(courtLines.getObjectByName("COURT_LINES_MID_MESH"), vec) <= DISTANCE_TO_OUT_OF_BOUNDS) {
                    velocity.x = 0;
                    x = 0;
                }
            } else {
                if (checkDistanceToLine(courtLines.getObjectByName("COURT_LINES_LEFT_MESH"), vec) <= DISTANCE_TO_OUT_OF_BOUNDS) {
                    x = 0;
                } else if (checkDistanceToLine(courtLines.getObjectByName("COURT_LINES_MID_MESH"), vec) <= DISTANCE_TO_OUT_OF_BOUNDS) {
                    velocity.x = 0;
                    x = 0;
                }
            }
            if (y > 0) {
                if (checkDistanceToLine(courtLines.getObjectByName("COURT_LINES_TOP_MESH"), vec) <= DISTANCE_TO_OUT_OF_BOUNDS) {
                    y = 0;
                    velocity.y = 0;
                }
            } else {
                if (checkDistanceToLine(courtLines.getObjectByName("COURT_LINES_BOTTOM_MESH"), vec) <= DISTANCE_TO_OUT_OF_BOUNDS) {
                    y = 0;
                    velocity.y = 0;
                }
            }
        }
        //Movement
        if (x !== 0)
            mesh.translateX(x);
        if (y !== 0)
            mesh.translateY(y);
        if (gotBall) {
            gameBall.getMesh().translateX(x);
            gameBall.getMesh().translateY(y);
        }
    };
    //Getters
    this.getMesh = function () {
        return mesh;
    };
    this.getMaterials = function () {
        return mesh.getObjectByName("PLAYER_MATERIALS");
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
            if (!makeDash) {
                velocity.y -= direction.y * ACCELERATION * dt;
            } else {
                velocity.y -= direction.y * DASH_VELOCITY;
                isDashing = true;
            }
        }
        if (moveLeft || moveRight) {
            if (!makeDash) {
                velocity.x -= direction.x * ACCELERATION * dt;
            } else {
                velocity.x -= direction.x * DASH_VELOCITY;
                isDashing = true;
            }
        }
        if (velocity.x != 0 || velocity.y != 0) {
            if (isDashing) {
                isDashing = false;
                dashActive = false;
                makeDash = false;
                setTimeout(function(){ dashActive = true; }, (DASH_COOLDOWN * 1000));
            }
            this.translate(velocity.x * dt, velocity.y * dt);
        }

        //console.log("Dt Player: " + dt);
    };
};


export { Player };