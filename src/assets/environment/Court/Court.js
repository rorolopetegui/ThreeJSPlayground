/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { CourtMesh } from './CourtMesh';

const COURT_SIZE_WIDTH = 280;
const COURT_SIZE_HEIGHT = 180;

function Court(scene) {
    //Court Attributes 
    //Court Components
    const mesh = CourtMesh(COURT_SIZE_WIDTH, COURT_SIZE_HEIGHT);

    //Components to the scene
    scene.add(mesh);

    this.update = function (dt) {
        return;
    };
};


export { Court };