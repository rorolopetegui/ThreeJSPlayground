import { Mesh, CircleGeometry, MeshBasicMaterial, Object3D } from 'three';
function PlayerMesh(){
    //Atts
    const playerSize = 6.5;
    const geometryTriangles = 32;
    const indicatorSize = 1;
    const indicatorTriangles = 8;
    const playerBodyColor = 0xffff00;
    const indicatorColor = 0x00ff00;
    //Atts
    var player = new Object3D();
    var playerMaterials = new Object3D();
    //var player_geometry = new Geometry();

    const player_body_geometry = new CircleGeometry(playerSize, geometryTriangles);
    const player_body_material = new MeshBasicMaterial({ color: playerBodyColor });
    const player_body_mesh = new Mesh(player_body_geometry, player_body_material);
    playerMaterials.add(player_body_mesh);
    /*player_body_mesh.updateMatrix();
    player_geometry.merge(player_body_mesh.geometry, player_body_mesh.matrix, 0);*/
    
    const player_indicator_geometry = new CircleGeometry(indicatorSize, indicatorTriangles);
    const player_indicator_material = new MeshBasicMaterial({ color: indicatorColor });
    const player_indicator_mesh = new Mesh(player_indicator_geometry, player_indicator_material);
    //player_indicator_mesh.z = 2;
    player_indicator_mesh.position.set(0, 3, 0);
    playerMaterials.add(player_indicator_mesh);
    player.add(playerMaterials);
    player.position.set(0,0,0.1);
    //player_indicator_mesh.updateMatrix();
    //player_geometry.merge(player_indicator_mesh.geometry, player_indicator_mesh.matrix, 1);

    //var player = new Mesh(player_geometry, new MeshFaceMaterial([player_body_material, player_indicator_material]));

    //player.geometry.computeFaceNormals();
    //player.geometry.computeVertexNormals();
    
    return player;
};

export {PlayerMesh}