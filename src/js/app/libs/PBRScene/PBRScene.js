import BABYLON from 'babylonjs';

export class PBRScene {

    constructor(canvas,skyPath)
    {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.engine.runRenderLoop(this.render.bind(this));

        this.skyboxMaterial = new BABYLON.StandardMaterial("_skyBoxMaterial", this.scene);
        this.skyboxMaterial.backFaceCulling = false;
        this.skyboxMaterial.disableLighting = true;

        this.skybox = BABYLON.Mesh.CreateBox("_skybox", 1000.0, this.scene);
        this.skybox.material = this.skyboxMaterial;
        this.skybox.infiniteDistance = true;

        this.hdrTexture = null;
        this.setSky(skyPath);
    }

    getReflectionTexture()
    {
        return this.hdrTexture;
    }

    setSky(path)
    {
        if(this.skyboxMaterial.reflectionTexture != null) this.skyboxMaterial.reflectionTexture.dispose();
        this.skyboxMaterial.reflectionTexture = new BABYLON.Texture(path+"/diffuse.jpg", this.scene);
        this.skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;

        let hdrTexture = new BABYLON.HDRCubeTexture(path+"/light.hdr", this.scene, 128,false,true);

        var materials = this.scene.materials;
        for(var i =0;i<materials.length;i++)
        {
            var material = materials[i];
            if(material.reflectionTexture != null && material !== this.skyboxMaterial)
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