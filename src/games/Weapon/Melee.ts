import { AnimatedSprite, Container, Graphics, ObservablePoint, Rectangle, Texture, TextureSource } from "pixi.js";
import { IHitBox } from "../IHitBox";


export class Melee extends Container implements IHitBox {
    
    private melee: AnimatedSprite;
    private hitbox: Graphics;
    
    constructor(shape1: TextureSource, shape2: TextureSource, shape3: TextureSource, shape4: TextureSource){
        super();
            this.melee = new AnimatedSprite([
                Texture.from(shape1),
                Texture.from(shape2),
                Texture.from(shape3),
                Texture.from(shape4),
            ]); 
        this.addChild(this.melee);

        this.hitbox=new Graphics();
        this.hitbox.beginFill(0x00FF00, 0.5);
        this.hitbox.drawRect(0,0,20,20);
        this.hitbox.endFill();
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
    
    public causeDamage (weapon: Rectangle, enemy: ObservablePoint<any>) {
        if (weapon.width < weapon.height) {
            if (this.x < enemy.x) {
                this.x -= weapon.width;
            } else if (this.x > enemy.x) {
                this.x += weapon.width;
            }
        } else {
            if (this.y > enemy.y) {
                this.y += weapon.height;
            } else if (this.y < enemy.y) {
                this.y -= weapon.height;
            }
        }
    }


}