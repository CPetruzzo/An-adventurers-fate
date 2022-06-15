import { Container, Graphics, Rectangle, Sprite, SpriteSource } from "pixi.js";
import { IHitBox } from "./IHitBox";

export class Potion extends Container implements IHitBox {
    private hitbox: Graphics;
    
    constructor(sprite: SpriteSource){
        super();
        
        const spr = Sprite.from(sprite);
        this.addChild(spr);
       
        this.hitbox=new Graphics();
        this.hitbox.beginFill(0x00FF00, 0.5);
        this.hitbox.drawRect(0,0,100,100);
        this.hitbox.endFill();
        this.hitbox.x=0;
        this.hitbox.y=0;
        this.addChild(this.hitbox);
    }
    
    public getHitBox(): Rectangle
    {
        return this.hitbox.getBounds(); 
    }

}