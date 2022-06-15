import { Container, NineSlicePlane, Texture, TextureSource} from "pixi.js";

export class HealthBar extends Container{

    public shape: TextureSource;
    private bar: NineSlicePlane;
    public leftwidth: number;
    public topheight: number;
    public rightwidth: number;
    public bottomheight: number;


    constructor(shape: TextureSource, leftwidth:number, topheight:number, currentHP:number, bottomheight:number, ){

        super();
        this.shape= shape;
        this.leftwidth= leftwidth;
        this.topheight= topheight;
        this.rightwidth= currentHP;
        this.bottomheight= bottomheight;
        
        this.bar = new NineSlicePlane(
            Texture.from(shape),
            this.leftwidth,
            this.topheight,
            this.rightwidth,
            this.bottomheight,
        );
        
        this.addChild(this.bar);        
    }
}