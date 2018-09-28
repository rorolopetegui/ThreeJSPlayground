function PlayerController(player) {
    var Player = player;
    var onKeyDown = function (event) {
        switch (event.keyCode) {
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
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var mouseX = 0;
    var mouseY = 0;
    var onMouseMove = function (event) {
        mouseX = ((event.clientX + 0.5) - windowHalfX);
        mouseY = ((event.clientY + 0.5) - windowHalfY);
        var x = mouseX;
        var y = -mouseY;
        var alfa;
        alfa = Math.atan(y / x);
        alfa = (alfa * 180) / Math.PI;

        if (Math.sign(x) === -1)
            alfa += 180;
        
        var rotation = ((alfa - 90) * Math.PI) / 180;


        Player.getMaterials().rotation.set(0, 0, rotation);
    }

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    document.addEventListener('mousemove', onMouseMove, false);
}
export { PlayerController };