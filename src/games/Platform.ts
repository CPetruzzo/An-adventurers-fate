import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitBox } from "./IHitBox";

export class Platform extends Container implements IHitBox {
    
    private hitbox: Graphics;
    
    constructor(){
        super();
        
        const spr = Sprite.from("tileset.png");
        spr.position.set(-140,-55)
        spr.scale.set(2.5,1)
        this.addChild(spr);

        this.hitbox=new Graphics();
        this.hitbox.beginFill(0x00FF00, 0);
        this.hitbox.drawRect(-140,-35,250,70);
        this.hitbox.endFill();
        this.hitbox.x=0;
        this.hitbox.y=0;
        this.addChild(this.hitbox);

        const auxZero=new Graphics();
            auxZero.beginFill(0xFF00FF);
            auxZero.drawCircle(0,0,5);
            auxZero.endFill();
            this.addChild(auxZero);

    }
    
    public getHitBox(): Rectangle
    {
        return this.hitbox.getBounds(); 
    }

}