/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Scene, Color } from 'three';
import { GeneralLights } from './../assets/GeneralLights';
import { Player } from './../assets/Player';

function PrincipalScene() {
    const scene = new Scene();
    scene.background = new Color("#000");
    const player = new Player(scene);
    this.getScene = function(){
        return scene;
    };
    this.getCamera = function(){
        return player.getCamera();
    };
    const SceneSubjects = [
        new GeneralLights(scene),
        player,
    ];
    
    this.update = function (dt) {
        //console.log("DT PrincipalScene" + dt);
        for (let i = 0; i < SceneSubjects.length; i++)
            SceneSubjects[i].update(dt);
    };
};
export { PrincipalScene };

