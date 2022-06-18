import { Graphics, ObservablePoint, Rectangle, Text } from "pixi.js";

import { IHitBox } from "../IHitBox";
import { PhysicsContainer } from "../PhysicsContainer";

export class Enemy extends PhysicsContainer implements IHitBox {


    public static readonly GRAVITY = 1000;
    public hitbox: Graphics;
    public healthOnScreen: Text;
    public currentHealth: number = 150;

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
        this.hitbox.drawRect(-70, -130, 145, 130);
        this.hitbox.endFill();

        this.acceleration.y = Enemy.GRAVITY;

        this.addChild(this.hitbox);

        // let currentScene:any = undefined;
        let initialHealth: number = 150;
        let currentHealth: number = initialHealth;
        this.healthOnScreen = new Text(`${currentHealth}`+ "HP", { fontSize: 40, fontFamily: ("Arial") });
        // this.addChild(this.healthOnScreen);
        this.healthOnScreen.x = -60;
        this.healthOnScreen.y = -130;
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

    public getEnemyHurt(damage: number) {
            this.currentHealth -= damage;
            this.healthOnScreen.text = `${this.currentHealth}` + "HP";
            console.log("Enemy health: " + this.currentHealth);       
        }
    



}
