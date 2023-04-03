import { Graphics, ObservablePoint, Point, Rectangle, Sprite } from "pixi.js";
import { Arek } from "../Enemies/Arek";
import { Enemy } from "../Enemies/Enemy";
import { IHitBox } from "../IHitBox";
import { PhysicsContainer } from "../PhysicsContainer";
import { Tween } from "tweedle.js";

export class Arrow extends PhysicsContainer implements IHitBox {

    public canShoot: boolean;
    public attack: number;
    public areaDamage: number;
    private arrow: Sprite;
    private hitbox: Graphics;
    public arrowLaunched: boolean = false;

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
        this.hitbox.beginFill(0xFF00FF, 0);
        this.hitbox.drawRect(0, 0, 100, 100);
        this.hitbox.endFill();
        this.arrow.addChild(this.hitbox);
    }

    /** hitbox de las flechas */
    public getHitBox(): Rectangle {
        return this.hitbox.getBounds();
    }

    /** Función para dañar con flechas */
    public getEnemyHurt(damage: number, enemy: Enemy | Arek) {
        enemy.currentHealth -= damage;
        enemy.healthOnScreen.text = `${enemy.currentHealth}` + "HP";
        console.log("Enemy health: " + enemy.currentHealth);
    }

    public shoot(arrow: Arrow, currentPos: Point, scale: number): void {
        new Tween(arrow)
        .to({ x: (currentPos.x + 500) * scale , y: currentPos.y }, 1000)
        .start().onComplete(() => { 
            arrow.destroy() 
        });
    }

    /** PARA SEPARAR ENEMIGOS DE PLATAFORMAS Y PODER GOLPEARLOS  */
    public arrowCollision(overlap: Rectangle, enemy: ObservablePoint<any>) {
        if (overlap.width < overlap.height) {
            if (this.x < enemy.x) {
                this.x -= overlap.width;
            } else if (this.x > enemy.x) {
                this.x += overlap.width;
            }
        }
        else {
            if (this.y > enemy.y) {
                this.y += overlap.height;
                this.speed.y = 0;
            } else if (this.y < enemy.y) {
                this.y -= overlap.height;
                this.speed.y = 0;
            }
        }
    }
}

