import { Vector3 } from 'three';
function PlayerController(player, sCamera) {
    var Player = player;
    var Camera = sCamera;
    var onKeyDown = function (event) {
        switch (event.keyCode) {
            case 32: //Space //Dash
                Player.makeDash(true);
                break;
            case 38: // up
            case 87: // w
                Player.moveUp(true);
                break;
            case 37: // left
            case 65: // a
                Player.moveLeft(true);
                break;
            case 40: // down
            case 83: // s
                Player.moveDown(true);
                break;
            case 39: // right
            case 68: // d
                Player.moveRight(true);
                break;
        }
    };
    var onKeyUp = function (event) {
        switch (event.keyCode) {
            case 32: //Space //Dash
                Player.makeDash(false);
                break;
            case 38: // up
            case 87: // w
                Player.moveUp(false);
                break;
            case 37: // left
            case 65: // a
                Player.moveLeft(false);
                break;
            case 40: // down
            case 83: // s
                Player.moveDown(false);
                break;
            case 39: // right
            case 68: // d
                Player.moveRight(false);
                break;
        }
    };
    var onMouseDown = function () {

        Player.onMouseDown();
    };
    var vec = new Vector3(); // create once and reuse
    var pos = new Vector3(); // create once and reuse
    var onMouseUp = function () {
        vec.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            - (event.clientY / window.innerHeight) * 2 + 1,
            0.5);

        vec.unproject(Camera);

        vec.sub(Camera.position).normalize();

        var distance = - Camera.position.z / vec.z;

        pos.copy(Camera.position).add(vec.multiplyScalar(distance));
        pos.x -= Player.getMesh().position.x;
        pos.y -= Player.getMesh().position.y;
        Player.onMouseUp(pos.x, pos.y);


    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup', onMouseUp, false);

}
export { PlayerController };