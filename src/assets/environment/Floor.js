import * as THREE from 'three';
// floor
var floorGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
//floorGeometry.rotateX( - Math.PI / 2 );
// vertex displacement
/*var position = floorGeometry.attributes.position;
for ( var i = 0, l = position.count; i < l; i ++ ) {
    vertex.fromBufferAttribute( position, i );
    vertex.x += Math.random() * 20 - 10;
    vertex.y += Math.random() * 2;
    vertex.z += Math.random() * 20 - 10;
    position.setXYZ( i, vertex.x, vertex.y, vertex.z );
}
floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
position = floorGeometry.attributes.position;
var colors = [];
for ( var i = 0, l = position.count; i < l; i ++ ) {
    color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    colors.push( color.r, color.g, color.b );
}
floorGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
var floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } ); */
var floorMaterial = new THREE.MeshBasicMaterial( {color: 0x1F3E0F } );
var Floor = new THREE.Mesh( floorGeometry, floorMaterial );
Floor.position.set(0, 0, -1);



export { Floor };