import { Graphics } from "pixi.js";
import { StateAnimation } from "../../utils/StateAnimation";
import { Enemy } from "./Enemy";

export class Arek extends Enemy {
    public canJump = true;
    static MOVE_SPEED: number = 200;
    private arek: StateAnimation;

    constructor() {
        super();
        this.arek = new StateAnimation();
        this.arek.pivot.set(0.55, 0.95);
        this.arek.position.set(0, -65);
        this.arek.addState("attack",
            [
                "00.png",
                "01.png",
                "02.png",
                "03.png",
                "04.png",
                "05.png",
                "06.png",
                "07.png",
                "08.png",
                "09.png",
                "10.png"
            ],
            0.15,
            true
        )

        this.arek.addState("idle",
            [
                "0.png",
                "1.png",
                "2.png",
                "3.png",
                "4.png",
                "5.png",
            ],
            0.15,
            true
        )

        // PUNTO GUÍA
        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF, 1);
        auxZero.drawCircle(0, 0, 5);
        auxZero.endFill();

        // agrego todos los movimientos a la clase player
        this.addChild(this.arek)
    }

    //  MOVIMIENTOS
    public override update(deltaMS: number) {
        super.update(deltaMS / 1000);
        this.arek.update(deltaMS / (1000 / 60));
    }

    public attackArek(): void {
        this.arek.playState("attack", false);
    }

    public idleArek(): void {
        this.arek.playState("idle", false);
    }
}
