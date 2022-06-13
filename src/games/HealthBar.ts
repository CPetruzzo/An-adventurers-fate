import { Container, NineSlicePlane, Texture, TextureSource} from "pixi.js";

export class HealthBar extends Container{

    public shape: TextureSource;
    private bar: NineSlicePlane;
    public num1: number;
    public num2: number;
    public num3: number;
    public num4: number;

    constructor(shape: TextureSource, num1:number, num2:number, num3:number, num4:number){

        super();
        this.shape= shape;
        this.num1= num1;
        this.num2= num2;
        this.num3= num3;
        this.num4= num4;
        
        this.bar = new NineSlicePlane(
            Texture.from(shape),
            this.num1,
            this.num2,
            this.num3,
            this.num4,
        );

        this.bar.scale.set(1,1);

        this.addChild(this.bar);
             
    }
}