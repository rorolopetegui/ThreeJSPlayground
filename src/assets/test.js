import * as THREE from 'three';
var testEnabled = true;

/*
    *TEST CLASS*
*/

var ObjectToShow = {
    Test: (function () {
        console.log("Testing Mode: " + testEnabled);
        if (testEnabled) {

            var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

            var cubeA = new THREE.Mesh(geometry, material);
            cubeA.position.set(100, 100, 0);

            var cubeB = new THREE.Mesh(geometry, material);
            cubeB.position.set(-100, -100, 0);

            var floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
            var floorMaterial = new THREE.MeshBasicMaterial({ color: 0x1F3E0F });
            var Floor = new THREE.Mesh(floorGeometry, floorMaterial);
            




            //create a group and add the two cubes
            //These cubes can now be rotated / scaled etc as a group
            var group = new THREE.Group();
            group.add(cubeA);
            group.add(cubeB);
            group.add(Floor);
            return group;
        } else {
            return false;
        }


    })(),
};

export { ObjectToShow };