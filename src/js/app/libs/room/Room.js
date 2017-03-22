import BABYLON from 'babylonjs';
import {TextureWrapper} from './wrapper/TextureWrapper';
import MaterialLoader from './MaterialLoader';
export class Room {

    constructor(canvas)
    {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(this.canvas, true);

        this.scene = new BABYLON.Scene(this.engine);

        this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), this.scene);
        this.camera.setPosition(new BABYLON.Vector3(-2, 2, 0));
        this.camera.attachControl(this.canvas, true);

       // this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);


        console.log("babylon mounted",this.scene);

        this.initEnv();

        this.engine.runRenderLoop(this.render.bind(this));

    }

    initEnv()
    {
       // this.hdrTexture = new TextureWrapper(new BABYLON.HDRCubeTexture("/assets/textures/skybox/room0.hdr", this.scene, 128));
     var skyTexture  =  new BABYLON.Texture("/assets/textures/skybox/room0.jpg", this.scene);
        skyTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;
        this.hdrTexture = new BABYLON.HDRCubeTexture("/assets/textures/skybox/room0.hdr", this.scene,256);

        this.hdrSkyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
        this.hdrSkyboxMaterial.reflectionTexture = skyTexture;
        this.hdrSkyboxMaterial.backFaceCulling = false;
        this.hdrSkyboxMaterial.disableLighting = true;


        this.hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, this.scene);
        this.hdrSkybox.material = this.hdrSkyboxMaterial;
        this.hdrSkybox.infiniteDistance = true;

        BABYLON.SceneLoader.ImportMesh("chair", "./assets/", "demo.babylon", this.scene, (newMeshes, particleSystems) =>{
            console.log("mesh loaded");
            newMeshes[0].material =  MaterialLoader.load("/assets/materials/chair",this.scene, this.hdrTexture);
        });

        BABYLON.SceneLoader.ImportMesh("lion", "./assets/", "demo.babylon", this.scene, (newMeshes, particleSystems)=> {
            newMeshes[0].material = MaterialLoader.load("/assets/materials/lion",this.scene, this.hdrTexture);
        });

        BABYLON.SceneLoader.ImportMesh("tv", "./assets/", "demo.babylon", this.scene, (newMeshes, particleSystems)=> {
            newMeshes[0].material = MaterialLoader.load("/assets/materials/tv0",this.scene, this.hdrTexture);
        });

/*
        var groundmat = new BABYLON.PBRMaterial("groundmat", this.scene);
        //groundmat.reflectionTexture = hdrTexture;
        this.hdrTexture.addMaterial(groundmat,"reflectionTexture");
        groundmat.environmentIntensity = 0.5;
        groundmat.specularIntensity = 0.3;

        groundmat.albedoTexture = new BABYLON.Texture("./assets/floor/floor1/diffuse.jpg", scene);
        groundmat.albedoTexture.uScale = groundmat.albedoTexture.vScale = 2;
        groundmat.albedoColor = BABYLON.Color3.White();

        groundmat.reflectivityTexture = new BABYLON.Texture("./assets/floor/floor1/metal.png", scene);
        groundmat.reflectivityTexture.uScale = groundmat.reflectivityTexture.vScale = 2;
        groundmat.useMicroSurfaceFromReflectivityMapAlpha = false;

        groundmat.bumpTexture = new BABYLON.Texture("./assets/floor/floor1/normal.jpg", scene);
        groundmat.bumpTexture.uScale = groundmat.bumpTexture.vScale = 2;
        */
        //groundmat.lightmapTexture = new BABYLON.Texture("./assets/chest/occlusion.jpg", scene);
        //groundmat.useLightmapAsShadowmap = true;

        // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
        this.ground = BABYLON.Mesh.CreateGround('ground1', 10, 10, 2, this.scene);
        this.ground.material = MaterialLoader.load("/assets/materials/wood0",this.scene, this.hdrTexture);
        //this.hdrTexture.addMaterial(ground.material,"reflectionTexture");
        //ground.material = groundmat;


    }


    updateGround(path)
    {
        this.ground.material = MaterialLoader.load(path,this.scene, this.hdrTexture);
    }

    updateSkybox(path)
    {

        var hdrTexture = new BABYLON.HDRCubeTexture(path+".hdr", this.scene, 128);
        var skyTexture = new BABYLON.Texture(path+".jpg", this.scene);
        skyTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;

        var materials = this.scene.materials;
        for(var i =0;i<materials.length;i++)
        {
            var material = materials[i];
            if(material == this.hdrSkyboxMaterial)
            {
                this.hdrSkyboxMaterial.reflectionTexture.dispose();
                this.hdrSkyboxMaterial.reflectionTexture = skyTexture;
            }
            else if(material.reflectionTexture != null)
            {
                material.reflectionTexture = hdrTexture;
            }
        }

        if(this.hdrTexture) this.hdrTexture.dispose();
        this.hdrTexture = hdrTexture;
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