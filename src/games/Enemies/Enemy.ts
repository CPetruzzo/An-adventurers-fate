import { Graphics, ObservablePoint, Rectangle } from "pixi.js";

import { IHitBox } from "../IHitBox";
import { PhysicsContainer } from "../PhysicsContainer";

export class Enemy extends PhysicsContainer implements IHitBox {
    
    
    public static readonly GRAVITY = 1000;
    public hitbox: Graphics;

    constructor() {
        super();

        // PUNTO GUÍA
        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0, 0, 5);
        auxZero.endFill();

        // CAJAS
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0);
        this.hitbox.drawRect(-40, -130, 130, 130);
        this.hitbox.endFill();

        this.acceleration.y = Enemy.GRAVITY;

        this.addChild(this.hitbox);
    }

    // me da la distancia desde el (0,0) al borde inicial de la hitbox
    public getHitBox(): Rectangle {
        return this.hitbox.getBounds();
    }

    //PARA SEPARAR JUGADORES DE SUS PLATAFORMAS
    public separate(overlap: Rectangle, platform: ObservablePoint<any>) {
        if (overlap.width < overlap.height) {
            if (this.x < platform.x) {
                this.x -= overlap.width;
            } else if (this.x > platform.x) {
                this.x += overlap.width;
            }
        }
        else {
            if (this.y > platform.y) {
                this.y += overlap.height;
                this.speed.y = 0;
            } else if (this.y < platform.y) {
                this.y -= overlap.height;
                this.speed.y = 0;
            }
        }
    }
}
