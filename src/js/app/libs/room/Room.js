import BABYLON from 'babylonjs';
import handjs from 'handjs';
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
       // console.log("camera class ",BABYLON.FreeCameraTouchInput);
        //this.camera = new BABYLON.VirtualJoysticksCamera("Camera", new BABYLON.Vector3(-2, 5, 0), this.scene);
        this.camera.attachControl(this.canvas,false);


        this.initEnv();
        this.engine.runRenderLoop(this.render.bind(this));

    }

    initEnv()
    {
       // this.hdrTexture = new TextureWrapper(new BABYLON.HDRCubeTexture("/assets/textures/skybox/room0.hdr", this.scene, 128));
     var skyTexture  =  new BABYLON.Texture("/assets/textures/skybox/room0.jpg", this.scene);
        skyTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;
        this.hdrTexture = new BABYLON.HDRCubeTexture("/assets/textures/skybox/room0.hdr", this.scene,256,false,true);

        this.hdrSkyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
        this.hdrSkyboxMaterial.reflectionTexture = skyTexture;
        this.hdrSkyboxMaterial.backFaceCulling = false;
        this.hdrSkyboxMaterial.disableLighting = true;


        this.hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, this.scene);
        this.hdrSkybox.material = this.hdrSkyboxMaterial;
        this.hdrSkybox.infiniteDistance = true;

        BABYLON.SceneLoader.ImportMesh("chair", "./assets/", "demo.babylon", this.scene, (newMeshes, particleSystems) =>{
            this.defaultChairMaterial = {
                bumpTexture:new BABYLON.Texture("./assets/materials/chair/normal.jpg",  this.scene,false, true, BABYLON.Texture.BILINEAR_SAMPLINGMODE),
                lightmapTexture:new BABYLON.Texture("./assets/materials/chair/ao.jpg",  this.scene,false, true, BABYLON.Texture.BILINEAR_SAMPLINGMODE),
                useLightmapAsShadowmap:true
            };

            newMeshes[0].material =  MaterialLoader.load("/assets/materials/wood1",this.scene, this.hdrTexture,this.defaultChairMaterial);
            this.chair = newMeshes[0];
        });

        BABYLON.SceneLoader.ImportMesh("lion", "./assets/", "demo.babylon", this.scene, (newMeshes, particleSystems)=> {
            this.defaultLionMaterial = {
                bumpTexture:new BABYLON.Texture("./assets/materials/lion/normal.jpg",  this.scene,false, true, BABYLON.Texture.BILINEAR_SAMPLINGMODE)
            };
            newMeshes[0].material = MaterialLoader.load("/assets/materials/lion",this.scene, this.hdrTexture,this.defaultLionMaterial);
            this.lion = newMeshes[0];
        });

        BABYLON.SceneLoader.ImportMesh("tv", "./assets/", "demo.babylon", this.scene, (newMeshes, particleSystems)=> {
            newMeshes[0].material = MaterialLoader.load("/assets/materials/tv0",this.scene, this.hdrTexture);
            this.tv = newMeshes[0];
        });


        this.ground = BABYLON.Mesh.CreateGround('ground1', 10, 10, 2, this.scene);
        this.ground.material = MaterialLoader.load("/assets/materials/wood0",this.scene, this.hdrTexture);
    }

    updateLion(path)
    {
        this.lion.material = MaterialLoader.load(path,this.scene, this.hdrTexture,this.defaultLionMaterial);
    }

    updateChair(path)
    {
        this.chair.material = MaterialLoader.load(path,this.scene, this.hdrTexture,this.defaultChairMaterial);
    }

    updateGround(path)
    {
        this.ground.material = MaterialLoader.load(path,this.scene, this.hdrTexture);
    }

    updateTV(path)
    {
        this.tv.material = MaterialLoader.load(path,this.scene, this.hdrTexture);
    }

    updateSkybox(path)
    {

        var hdrTexture = new BABYLON.HDRCubeTexture(path+".hdr", this.scene, 128,false,true);
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