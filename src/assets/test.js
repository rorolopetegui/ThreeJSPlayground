/*eslint no-unused-vars: ["error", { "args": "none" }]*/

//import { Player } from './../assets/Player/Player';
//import { Ball } from './../assets/Ball/Ball';
//import { Court } from './../assets/environment/Court/Court';
/*
    *TEST CLASS*
*/

function Test(scene) {
    console.log("Testing Mode Enabled");
    var SceneSubjects = [
    ];
    /*
    const court = new Court(scene);
    const ball = new Ball(scene, { teamShootMe: 0, position: { x: 0, y: 0 } });
    SceneSubjects.push(ball);
    const player = new Player(0, { x: -50, y: 0 }, ball, scene, true);
    player.team = 1;
    player.getMesh().position.set(-50, 0, 0);
    SceneSubjects.push(player);
*/

    this.update = function (dt) {
        for (let i = 0; i < SceneSubjects.length; i++)
            SceneSubjects[i].update(dt);
    };
};

export { Test };