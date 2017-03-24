import BABYLON from 'babylonjs';
import MaterialLoader from '../room/MaterialLoader';
export class Editor {

    constructor(canvas) {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);


        this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), this.scene);
        this.camera.setPosition(new BABYLON.Vector3(-2, 2, 0));
        // console.log("camera class ",BABYLON.FreeCameraTouchInput);
        //this.camera = new BABYLON.VirtualJoysticksCamera("Camera", new BABYLON.Vector3(-2, 5, 0), this.scene);
        this.camera.attachControl(this.canvas, false);


        this.initEnv();
        // this.scene.registerBeforeRender(this.beforeRender.bind(this));
        this.engine.runRenderLoop(this.render.bind(this));
    }

    render()
    {
        this.scene.render();
    }


    updateSize()
    {
        this.engine.resize();
    }
}