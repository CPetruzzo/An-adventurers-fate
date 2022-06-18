import { Container, Graphics, Rectangle, Sprite, SpriteSource } from "pixi.js";
import { IHitBox } from "./IHitBox";

export class Potion extends Container implements IHitBox {
    private hitbox: Graphics;

    constructor(sprite: SpriteSource, hitboxWidth: number, hitboxHeight: number, anchorx?: number, anchory?: number,) {
        super();

        const spr = Sprite.from(sprite);
        spr.anchor.set(anchorx, anchory);
        this.addChild(spr);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FF00, 0);
        this.hitbox.drawRect(0, 0, hitboxWidth, hitboxHeight);
        this.hitbox.endFill();
        this.addChild(this.hitbox);

        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0, 0, 5);
        auxZero.endFill();
        this.addChild(auxZero);
    }

    public getHitBox(): Rectangle {
        return this.hitbox.getBounds();
    }

}