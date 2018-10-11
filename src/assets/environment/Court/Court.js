/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { CourtMesh } from './CourtMesh';

const COURT_SIZE_WIDTH = 280;
const COURT_SIZE_HEIGHT = 180;

function Court(scene) {
    //Court Attributes 
    this.manyteams = 2;
    //Court Components
    const mesh = CourtMesh(COURT_SIZE_WIDTH, COURT_SIZE_HEIGHT);
    mesh.name = "Court";
    //Components to the scene
    scene.add(mesh);


    //Getters
    this.getCourtLines = function(){
        return mesh.getObjectByName("COURT_LINES");
    };
    this.getTeamOne = function(){
        return mesh.getObjectByName("COURT_TEAM_ONE_FLOOR");
    };
    this.getTeamTwo = function(){
        return mesh.getObjectByName("COURT_TEAM_TWO_FLOOR");
    };

    this.update = function (dt) {
        return;
    };
};


export { Court };