import * as THREE from 'three';
import * as Detector from './commons/detector';
import { Player } from './assets/player';


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set( 0, 0, 200 );
camera.lookAt( 0, 0, 0 );

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

Player.Body.position.set(-50,-50,0);
scene.add( Player.Body );

function GameLoop() {
    requestAnimationFrame(GameLoop);
    
    //Cube rotation
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

if (Detector.webgl) {
    // Initiate function or other initializations here
    GameLoop();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
