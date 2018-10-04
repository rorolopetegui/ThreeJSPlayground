import { Mesh, CircleGeometry, MeshBasicMaterial, Object3D } from 'three';
function BallMesh(){
    //Atts
    const ballSize = 4;
    const geometryTriangles = 32;
    const ballBodyColor = 0xCCCCCC;
    
    //Atts
    var ball = new Object3D();
    var ballMaterials = new Object3D();

    const ball_body_geometry = new CircleGeometry(ballSize, geometryTriangles);
    const ball_body_material = new MeshBasicMaterial({ color: ballBodyColor });
    const ball_body_mesh = new Mesh(ball_body_geometry, ball_body_material);
    ballMaterials.add(ball_body_mesh);
    
    ball.add(ballMaterials);
    
    
    return ball;
};

export {BallMesh}