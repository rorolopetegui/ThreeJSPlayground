/*eslint no-unused-vars: ["error", { "args": "none" }]*/
//import * as THREE from 'three';
import { Clock } from 'three';
import { PrincipalScene } from './scenes/PrincipalScene';
import { TestScene } from './scenes/TestScene';
var testEnabled = false;

function SceneManager(canvas) {

    const clock = new Clock();
    const screenDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    var activeScene;
    if (!testEnabled)
        activeScene = new PrincipalScene();
    else
        activeScene = new TestScene();
    const camera = activeScene.getCamera();
    const renderer = canvas;

    this.update = function () {
        const elapsedTime = clock.getDelta();
        activeScene.update(elapsedTime);

        renderer.render(activeScene.getScene(), camera);
    }

    this.onWindowResize = function () {
        const width = window.innerWidth;
        const height = window.innerHeight * 0.993;
        //const width  = window.innerWidth;
        //const height = window.innerHeight;


        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }
}

export { SceneManager };