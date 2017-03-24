import BABYLON from 'babylonjs';
import PBRMaterialLoader from '../PBRScene/PBRMaterialLoader';
import {PBRScene} from '../PBRScene/PBRScene';

export class Room {

    constructor(canvas)
    {
        this.canvas = canvas;
        this.pbrScene = new PBRScene(this.canvas,"/assets/sky/sky0");
      //  this.pbrScene.setSky("/assets/sky/sky0");

        this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), this.pbrScene.scene);
        this.camera.setPosition(new BABYLON.Vector3(-2, 2, 0));
        this.camera.attachControl(this.canvas,false);

        BABYLON.SceneLoader.ImportMesh("chair", "./assets/", "demo.babylon", this.pbrScene.scene, (newMeshes, particleSystems) =>{

            this.defaultChairMaterial = {
                bumpTexture:new BABYLON.Texture("./assets/materials/chair/normal.jpg",  this.pbrScene.scene,false, true, BABYLON.Texture.BILINEAR_SAMPLINGMODE),
                lightmapTexture:new BABYLON.Texture("./assets/materials/chair/ao.jpg",  this.pbrScene.scene,false, true, BABYLON.Texture.BILINEAR_SAMPLINGMODE),
                useLightmapAsShadowmap:true
            };

            newMeshes[0].material =  PBRMaterialLoader.load("/assets/materials/chair",this.pbrScene,this.defaultChairMaterial);
            this.chair = newMeshes[0];
            console.log("chair loaded");
        });



        BABYLON.SceneLoader.ImportMesh("lion", "./assets/", "demo.babylon", this.pbrScene.scene, (newMeshes, particleSystems)=> {
            this.defaultLionMaterial = {
                bumpTexture:new BABYLON.Texture("./assets/materials/lion/normal.jpg",  this.pbrScene.scene,false, true, BABYLON.Texture.BILINEAR_SAMPLINGMODE)
            };
            newMeshes[0].material =  PBRMaterialLoader.load("/assets/materials/lion",this.pbrScene,this.defaultLionMaterial);
            this.lion = newMeshes[0];
            //this.lionv  = this.lion.getVerticesData(BABYLON.VertexBuffer.PositionKind);
            //this.lionfv = this.lion.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        });

        BABYLON.SceneLoader.ImportMesh("tv", "./assets/", "demo.babylon", this.pbrScene.scene, (newMeshes, particleSystems)=> {
            newMeshes[0].material = PBRMaterialLoader.load("/assets/materials/tv0",this.pbrScene);
            this.tv = newMeshes[0];
        });


        this.ground = BABYLON.Mesh.CreateGround('ground1', 10, 10, 2, this.pbrScene.scene);
        this.ground.material = PBRMaterialLoader.load("/assets/materials/wood0",this.pbrScene);
    }


    updateLion(path)
    {
        this.lion.material = PBRMaterialLoader.load(path,this.pbrScene,this.defaultLionMaterial);
    }

    updateChair(path)
    {
        this.chair.material = PBRMaterialLoader.load(path,this.pbrScene,this.defaultChairMaterial);
    }

    updateGround(path)
    {
        this.ground.material = PBRMaterialLoader.load(path,this.pbrScene);
    }

    updateTV(path)
    {
        this.tv.material = PBRMaterialLoader.load(path,this.pbrScene);
    }

    updateSkybox(path)
    {
        this.pbrScene.setSky(path);
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