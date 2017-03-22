import BABYLON from 'babylonjs';
import Axios from 'axios';

export default {

    load(path,scene,skyWrapper)
    {
        console.log("load material ",path);
        var material = new BABYLON.PBRMaterial(path, scene);
        //skyWrapper.addMaterial(material,"reflectivityTexture");
        material.reflectionTexture = skyWrapper;
        Axios.get(path+"/material.json")
            .then(response=>{
                console.log("json loaded",response.data);
                var props = response.data.props;
                for(var i in props)
                {
                    var propType = this.getType(i);
                    var value = props[i];
                    switch (propType)
                    {
                        case "texture":
                            material[i] = new BABYLON.Texture(path+"/"+value,  scene,false, true, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
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