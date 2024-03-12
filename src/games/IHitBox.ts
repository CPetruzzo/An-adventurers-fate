import { Container, Graphics, Rectangle } from "pixi.js";

export interface IHitBox {
    getHitBox(): Rectangle;
}

export class Slope extends Container implements IHitBox {
    private hitbox: Graphics;

    constructor(width: number, height: number, angle: number) {
        super();
        this.hitbox = new Graphics();
        // this.hitbox.beginFill(0x00FF00, 0);
        this.hitbox.beginFill(0x00FF00, 0.3);
        this.angle = angle;
        this.hitbox.drawRect(-(width / 2), -(height / 2), width, height);
        this.hitbox.endFill();
        this.addChild(this.hitbox);

    }

    public getHitBox(): Rectangle {
        return this.hitbox.getBounds();
    }
}

export function checkCollision(objA: IHitBox, objB: IHitBox): Rectangle | null {
    const rA = objA.getHitBox();
    const rB = objB.getHitBox();

    const intersection = new Rectangle();
    intersection.x = Math.max(rA.x, rB.x);
    intersection.y = Math.max(rA.y, rB.y);
    intersection.width = Math.min(rA.x + rA.width, rB.x + rB.width) - intersection.x;
    intersection.height = Math.min(rA.y + rA.height, rB.y + rB.height) - intersection.y;

    if (intersection.width > 0 && intersection.height > 0) {
        return intersection;
    } else {
        return null;
    }
}



