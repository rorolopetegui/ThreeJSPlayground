import * as THREE from 'three';
var geometry = new THREE.CircleGeometry( 5, 32);
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

var Player = {
    Body:( function () {
        return new THREE.Mesh( geometry, material );
	} )(),
};

export { Player };