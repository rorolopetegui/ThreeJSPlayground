import { Mesh, CircleGeometry, MeshBasicMaterial, Object3D } from 'three';

const PLAYER_SIZE = 6.5;
const PLAYER_GEOMETRY_TRIANGLES = 32;
const PLAYER_BODY_COLOR = 0xffff00;
const BOT_BODY_COLOR = 0xB4EEB4;

function PlayerMesh(isPlayer) {
    //Atts

    const indicatorSize = 2;
    const indicatorTriangles = 8;
    const indicatorColor = 0xffff00;
    //Atts
    var player = new Object3D();
    player.name = "PLAYER_WRAPPER";
    var playerMaterials = new Object3D();
    playerMaterials.name = "PLAYER_MATERIALS";
    //var player_geometry = new Geometry();

    const player_body_geometry = new CircleGeometry(PLAYER_SIZE, PLAYER_GEOMETRY_TRIANGLES);
    var player_body_material = new MeshBasicMaterial({ color: PLAYER_BODY_COLOR });
    if (!isPlayer)
        player_body_material = new MeshBasicMaterial({ color: BOT_BODY_COLOR });
    const player_body_mesh = new Mesh(player_body_geometry, player_body_material);
    player_body_mesh.name = "BODY_MESH";
    playerMaterials.add(player_body_mesh);
    /*player_body_mesh.updateMatrix();
    player_geometry.merge(player_body_mesh.geometry, player_body_mesh.matrix, 0);*/

    const player_indicator_geometry = new CircleGeometry(indicatorSize, indicatorTriangles);
    const player_indicator_material = new MeshBasicMaterial({ color: indicatorColor });
    const player_indicator_mesh = new Mesh(player_indicator_geometry, player_indicator_material);
    player_indicator_mesh.name = "ACTION_STATE";
    //player_indicator_mesh.z = 2;
    //player_indicator_mesh.position.set(0, 3, 0);
    playerMaterials.add(player_indicator_mesh);
    player.add(playerMaterials);

    player.position.set(0, 0, 0.1);
    //player_indicator_mesh.updateMatrix();
    //player_geometry.merge(player_indicator_mesh.geometry, player_indicator_mesh.matrix, 1);

    //var player = new Mesh(player_geometry, new MeshFaceMaterial([player_body_material, player_indicator_material]));

    //player.geometry.computeFaceNormals();
    //player.geometry.computeVertexNormals();

    return player;
};

export { PlayerMesh }