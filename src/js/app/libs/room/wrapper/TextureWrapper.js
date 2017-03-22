export class TextureWrapper{

    constructor(texture)
    {
        this.texture = texture;
        this.materials = [];
    }

    addMaterial(material,propName)
    {
        this.materials.push({material,propName});
        material[propName] = this.texture;
    }

    setTexture(texture)
    {
        this.texture = texture;
        for(let i=0;i<this.materials.length;i++)
        {
            let propName = this.materials[i].propName;
            let material = this.materials[i].material;
            material[propName] = texture;
        }

        this.texture.dispose();
        this.texture = texture;
    }

}