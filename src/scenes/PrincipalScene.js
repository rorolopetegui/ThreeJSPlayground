/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { Scene, Color } from 'three';
import { Player } from './../assets/Player/Player';
import { MainMap } from './../assets/environment/MainMap';

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
        player,
        new MainMap(scene),
    ];
    
    this.update = function (dt) {
        //console.log("DT PrincipalScene" + dt);
        for (let i = 0; i < SceneSubjects.length; i++)
            SceneSubjects[i].update(dt);
    };
};
export { PrincipalScene };

