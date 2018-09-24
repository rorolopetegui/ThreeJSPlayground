import * as THREE from 'three';
import * as Detector from './commons/detector';
import { Player, Camera } from './assets/player';
import { ObjectToShow } from './assets/test';


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
    
}