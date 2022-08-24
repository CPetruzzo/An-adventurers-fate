import { AnimatedSprite, Graphics, Texture } from "pixi.js";
// import { StateAnimation } from "../../utils/StateAnimation";
import { Enemy } from "./Enemy";

export class Arek extends Enemy {

    public canJump = true;
    private arekIdle: AnimatedSprite;
    public arekAttack: AnimatedSprite;
    static MOVE_SPEED: number = 200;
    // private arek: StateAnimation;

    constructor() {
        super();



        //BARDO RUN
        this.arekAttack = new AnimatedSprite(
            [
                Texture.from("00.png"),
                Texture.from("01.png"),
                Texture.from("02.png"),
                Texture.from("03.png"),
                Texture.from("04.png"),
                Texture.from("05.png"),
                Texture.from("06.png"),
                Texture.from("07.png"),
                Texture.from("08.png"),
                Texture.from("09.png"),
                Texture.from("10.png"),

            ],
            true
        );
        this.arekAttack.scale.set(1);
        this.arekAttack.animationSpeed = 0.15;
        this.arekAttack.anchor.set(0.55, 0.95);
        this.arekAttack.play();
        this.arekAttack.visible = false;

        //BARDO RUN
        this.arekIdle = new AnimatedSprite(
            [
                Texture.from("0.png"),
                Texture.from("1.png"),
                Texture.from("2.png"),
                Texture.from("3.png"),
                Texture.from("4.png"),
                Texture.from("5.png"),
            ],
            true
        );
        this.arekIdle.scale.set(1);
        this.arekIdle.animationSpeed = 0.15;
        this.arekIdle.anchor.set(0.55, 0.95);
        this.arekIdle.play();
        this.arekIdle.visible = true;

        // PUNTO GUÍA
        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0, 0, 5);
        auxZero.endFill();

        // agrego todos los movimientos a la clase player
        this.addChild(
            this.arekIdle,
            this.arekAttack,
        )
    }

    //  MOVIMIENTOS
    public override update(deltaMS: number) {
        super.update(deltaMS / 1000);
        this.arekIdle.update(deltaMS / (1000 / 60));
    }

    public attackArek() {
        this.arekAttack.visible = true;
        this.arekIdle.visible = false;
    }

    public idleArek() {
        this.arekAttack.visible = false;
        this.arekIdle.visible = true;
    }

}
