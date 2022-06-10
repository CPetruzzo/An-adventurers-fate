import { AnimatedSprite, Graphics, Texture } from "pixi.js";
import { Enemy } from "./Enemy";

export class Arek extends Enemy {

    public canJump = true;
    private arekIdle: AnimatedSprite;
    static MOVE_SPEED: number = 200;

    constructor() {
        super();

        //BARDO RUN
        this.arekIdle = new AnimatedSprite(
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
        this.arekIdle.scale.set(1);
        this.arekIdle.animationSpeed = 0.15;
        this.arekIdle.anchor.set(0.55,0.95);
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
            )
    }

    //  MOVIMIENTOS
    public override update(deltaMS: number) {
        super.update(deltaMS / 1000);
        this.arekIdle.update(deltaMS / (1000 / 60));
    }



}
