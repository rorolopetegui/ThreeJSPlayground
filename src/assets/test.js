import * as THREE from 'three';
var testEnabled = false;

/*
    *TEST CLASS*
*/

var ObjectToShow = {
    Test: (function () {
        if (testEnabled) {
            console.log("Testing Mode Enabled");
            //Atts
            const playerSize = 5;
            const geometryTriangles = 32;
            const indicatorSize = 1;
            const indicatorTriangles = 8;
            const playerBodyColor = 0xffff00;
            const indicatorColor = 0x00ff00;
            var player = new THREE.Object3D();
            //Atts
            const player_body_geometry = new THREE.CircleGeometry(playerSize, geometryTriangles);
            const player_body_material = new THREE.MeshBasicMaterial({ color: playerBodyColor });
            const player_body_mesh = new THREE.Mesh(player_body_geometry, player_body_material);
            player.add(player_body_mesh);
            const player_indicator_geometry = new THREE.CircleGeometry(indicatorSize, indicatorTriangles);
            const player_indicator_material = new THREE.MeshBasicMaterial({ color: indicatorColor });
            const player_indicator_mesh = new THREE.Mesh(player_indicator_geometry, player_indicator_material);
            player_indicator_mesh.position.set(0,3,0);
            player.add(player_indicator_mesh);
            player.position.set(10,10,0);
            //player.
            var group = new THREE.Group();

            group.add(player);
            //group.add(arrowHelper);
            //group.add(pendulum);

            return group;
        } else {
            return false;
        }


    })(),
};

export { ObjectToShow };