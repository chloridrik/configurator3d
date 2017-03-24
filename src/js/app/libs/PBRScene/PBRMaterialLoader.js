import BABYLON from 'babylonjs';
import Axios from 'axios';

export default {

    load(path,pbrScene,defaultValues)
    {
        var material = new BABYLON.PBRMaterial(path, pbrScene.scene);
        material.reflectionTexture = pbrScene.getReflectionTexture();
        if(defaultValues == null) defaultValues = {};
        for(var i in defaultValues)
        {
            material[i] = defaultValues[i];
        }
        Axios.get(path+"/material.json")
            .then(response=>{
                var scale = response.data.scale || 1;
                var props = response.data.props;
                for(var i in props)
                {
                    var propType = this.getType(i);
                    var value = props[i];
                    switch (propType)
                    {
                        case "texture":
                            material[i] = new BABYLON.Texture(path+"/"+value,  pbrScene.scene,false, true, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
                            material[i].uScale = material[i].vScale = scale;
                            break;
                        case "color":
                            if(value.length == 4) material[i] = new BABYLON.Color4(value[0], value[1], value[2],value[3]);
                            else material[i] = new BABYLON.Color3(value[0], value[1], value[2]);
                            break;
                        case "basic":
                            material[i] = value;
                            break;
                    }
                }

            })
            .catch(error=>{
                console.warn(error)
            });

        return material;
    },

    getType(propName)
    {
        var textures = ["albedoTexture","bumpTexture","lightmapTexture","reflectivityTexture"];
        var colors = ["albedoColor","reflectivityColor"];

        if(textures.indexOf(propName) >-1) return "texture";
        if(colors.indexOf(propName) >-1) return "color";
        return "basic"
    }




}