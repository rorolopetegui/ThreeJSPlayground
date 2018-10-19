/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Vector3 } from 'three';
import { BallMesh } from './BallMesh';

function Ball(scene, gameBall) {
    //Ball atts
    this.teamShootMe = gameBall.teamShootMe;
    //Helpers
    //Save Scene in case that needed
    var Scene = scene;
    var courtLines = Scene.getObjectByName("COURT_LINES");
    mostCloseLine = courtLines.getObjectByName("COURT_LINES_TOP_MESH");
    //Ball vars
    var velocity = new Vector3();
    var direction = new Vector3();
    var forceImpulse = 0;
    //Ball Components
    const mesh = BallMesh();
    mesh.name = "Ball";
    mesh.position.set(gameBall.position.x, gameBall.position.y, 0);
    //Components to the scene
    Scene.add(mesh);
    //setters
    this.shootBall = function (x, y, force, teamShooted) {
        direction.x = x;
        direction.y = y;
        direction.normalize();
        forceImpulse = force;
        velocity.y += direction.y * forceImpulse;
        velocity.x += direction.x * forceImpulse;
        this.teamShootMe = teamShooted;
    };
    //Getters
    this.getMesh = function () {
        return mesh;
    };
    this.getMaterials = function () {
        return mesh.children[0];
    };
    this.update = function (dt) {
        //Now the ball moves in the server side
        return;
    };
};

export { Ball };