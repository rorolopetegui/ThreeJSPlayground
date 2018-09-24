import * as THREE from 'three';
var geometry = new THREE.CircleGeometry( 5, 32);
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
var Camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
Camera.position.set( 0, 0, 200 );
Camera.lookAt( 0, 0, 0 );

var Player = {
    Body:( function () {
        return new THREE.Mesh( geometry, material );
	} )(),  
};

export { Player, Camera };