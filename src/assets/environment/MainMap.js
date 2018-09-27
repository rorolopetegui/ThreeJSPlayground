/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Floor } from './Floor'

function MainMap(scene) {
    //mesh.position.set(0, 0, -20);
    scene.add(Floor);

    this.update = function (dt) {
        return;
        //console.log("Dt Player: " + dt);
        
    };
};


export { MainMap };