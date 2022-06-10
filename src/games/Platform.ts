import { Container, Graphics, NineSlicePlane, Rectangle, Texture, TextureSource } from "pixi.js";
import { IHitBox } from "./IHitBox";

export class Platform extends Container implements IHitBox {
    
    public shape: TextureSource;
    private tile: NineSlicePlane;
    public num1: number;
    public num2: number;
    public num3: number;
    public num4: number;
    private hitbox: Graphics;
    
    constructor(shape: TextureSource, num1:number, num2:number, num3:number, num4:number, width: number, height: number){
        super();
        
        this.shape= shape;
        this.num1= num1;
        this.num2= num2;
        this.num3= num3;
        this.num4= num4;

        this.tile = new NineSlicePlane(
            Texture.from(shape),
            this.num1,
            this.num2,
            this.num3,
            this.num4,
        );
        this.tile.height = height;
        this.tile.width = width;
        this.tile.x=-(width/2);
        this.tile.y=-(height/2);

        this.addChild(this.tile);

        this.hitbox=new Graphics();
        this.hitbox.beginFill(0x00FF00, 0);
        this.hitbox.drawRect(-(width/2),-(height/2),width, height);
        this.hitbox.endFill();
        this.addChild(this.hitbox);

        const auxZero=new Graphics();
            auxZero.beginFill(0xFF00FF);
            auxZero.drawCircle(0,0,5);
            auxZero.endFill();
            // this.addChild(auxZero);

    }
    
    public getHitBox(): Rectangle
    {
        return this.hitbox.getBounds(); 
    }

}