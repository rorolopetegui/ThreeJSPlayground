/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import * as THREE from 'three';
//import { Player } from './../assets/Player/Player';
//import { Ball } from './../assets/Ball/Ball';
//import { Court } from './../assets/environment/Court/Court';
/*
    *TEST CLASS*
*/

function Test(scene) {
    console.log("Testing Mode Enabled");
    var spriteMap = new THREE.TextureLoader().load("./Sprites/megaman.png");
    var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
    var sprite = new THREE.Sprite(spriteMaterial);
    scene.add(sprite);
    /*var SceneSubjects = [
        sprite,
    ];*/
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
        
    };
};

export { Test };