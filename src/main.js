/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { WebGLRenderer } from 'three';
import * as Detector from './commons/Detector';
import { SceneManager } from './SceneManager';

var renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = document.body.appendChild(renderer.domElement);
const sceneManager = new SceneManager(renderer);

if (Detector.webgl) {
    // Initiate function or other initializations here
    bindEventListeners();
    render();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}

function bindEventListeners() {
    window.onresize = resizeCanvas;
    resizeCanvas();
}

function resizeCanvas() {    
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    sceneManager.onWindowResize();
    
}

function render() {
    requestAnimationFrame(render);
    sceneManager.update();
}



/*

import { Player, Camera } from './assets/Player';
import { ObjectToShow } from './assets/Test';
import { Floor } from './assets/environment/Floor';


var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*
To add a cube
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);*/
//Now we are going to make a line:
/*var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

var line = new THREE.Line( geometry, material );*/

//Player.Body.position.set(-50,-50,0);
/*

//Enter in the scene
scene.add(Floor);
scene.add( Player.Body );
scene.add( ObjectToShow.Test);

function GameLoop() {
    requestAnimationFrame(GameLoop);
    setInterval(Update, 16);
    
    //Cube rotation
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    renderer.render(scene, Camera);
}

if (Detector.webgl) {
    // Initiate function or other initializations here
    GameLoop();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}

function Update(){
    
}*/