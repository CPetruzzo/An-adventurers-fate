import { Graphics, Rectangle, Sprite } from "pixi.js";
import { Tween } from "tweedle.js";
import { IHitBox } from "../IHitBox";
import { PhysicsContainer } from "../PhysicsContainer";

export class Arrow extends PhysicsContainer implements IHitBox {

    private static readonly SHOOTING_SPEED = 500;

    public canShoot: boolean;
    public attack: number;
    public areaDamage: number;
    private arrow: Sprite;
    private hitbox: Graphics;

    constructor() {
        super();

        this.canShoot = true;
        this.attack = 1;
        this.areaDamage = 0;

        this.arrow = Sprite.from("Arrow");
        this.arrow.anchor.set(0.5);
        this.arrow.scale.set(0.05);
        this.addChild(this.arrow);

        // CAJAS
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 1);
        this.hitbox.drawRect(0, 0, 10, 10);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    public getHitBox(): Rectangle {
        return this.hitbox.getBounds();
    }

    public shoot() {
        if (this.canShoot) {
            this.speed.x = Arrow.SHOOTING_SPEED;
            this.canShoot = false;
            new Tween(this.arrow).to({}, 1450).start().onComplete(() => {
                this.canShoot = true;
            });
        }
    }
}

