/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/
import * as THREE from 'three';
import { BallMesh } from './Ball/BallMesh';
import { Court } from './environment/Court/Court';
/*
    *TEST CLASS*
*/
var radius = 4;
var lineHeight = 5 / 2;
const OUT_OF_BOUNDS = false;
const REFLECTION_DISTANCE = 8.5;
const REFLECTION_DISTANCE_GRACE = 7.5;

var distanceToOutOfBounds;
var mostCloseLine;
var direction = 1;
var bounce = false;
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


function Test(scene) {
    console.log("Testing Mode Enabled");
    var velocity = new THREE.Vector3();
    velocity.x = 120;



    var Scene = scene;
    //Ball Components
    const mesh = BallMesh();
    mesh.name = "Ball";
    //Components to the scene
    Scene.add(mesh);
    //Court
    const court = new Court(Scene);
    var courtLines = Scene.getObjectByName("COURT_LINES");

    this.translate = function (x, y) {
        if (!OUT_OF_BOUNDS) {
            var vec = new THREE.Vector2((mesh.position.x + x), (mesh.position.y + y));
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

    velocity.x = 100;
    velocity.y = 100;
    //velocity.x = 10;

    //this.translate();

    this.update = function (dt) {
        this.translate(velocity.x * dt, velocity.y * dt);
    };
};

export { Test };