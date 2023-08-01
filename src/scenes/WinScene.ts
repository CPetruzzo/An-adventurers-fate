import { sound } from "@pixi/sound";
import { AnimatedSprite, Container, Sprite, Texture } from "pixi.js";
import { Tween } from "tweedle.js";
import { PointButton } from "../ui/PointButton";
import { SceneManager } from "../utils/SceneManager";
import { MapScene } from "./MapScene";
import { playSound } from "../utils/SoundParams";

export class WinScene extends Container {
    private box: PointButton;
    public finish: boolean = false;
    private openingBox: AnimatedSprite;
    private award: Sprite;
    public winStage: boolean = false;

    constructor() {
        super();

        // IMAGEN DE LA CAJA SIN MOVERSE HECHA BOTON PARA QUE SE ABRA
        this.box = new PointButton(
            Texture.from("nro1.png"),
            Texture.from("nro1.png"),
            Texture.from("nro1.png")
        );
        this.box.position.set(625, 368);
        this.box.on("pointerClick", this.onBoxClick, this)
        this.addChild(this.box);

        // IMAGEN DE LA CAJA ABRIENDOSE
        this.openingBox = new AnimatedSprite([
            Texture.from("nro1.png"),
            Texture.from("nro2.png"),
            Texture.from("nro3.png"),
            Texture.from("nro4.png"),
            Texture.from("nro5.png"),
        ], false
        );
        this.openingBox.loop = false;
        this.openingBox.visible = true;
        this.openingBox.animationSpeed = 0.007;
        this.openingBox.position.set(400, 130);

        // IMAGEN DEL PREMIO
        this.award = new Sprite(Texture.from("itemSword"));
        this.award.position.set(500, 230);
        this.award.scale.set(0.2);
        this.award.alpha = 0;
    }

    public update(deltaTime: number) {
        this.openingBox.update(deltaTime);
    }

    /** Flag que activa la caja */
    public Box() {
        this.winStage = true;
    }

    /** Función que se activa cuando hacés click en la caja */
    public onBoxClick(): void {
        this.removeChild(this.box);
        this.addChild(this.openingBox);
        this.openingBox.play();
        playSound("Chest1", {});
        new Tween(this.openingBox).to({}, 1000).start().onComplete(this.Award.bind(this));
    }

    /** Función que hace salir la espada (premio) */
    private Award(): void {
        this.addChild(this.award);
        this.award.visible = true;

        sound.stop("Chest1");
        const winbgm = sound.find("ItemBGM");
        winbgm.volume = 0.2;
        winbgm.play();

        new Tween(this.award)
            .to({ x: 400, y: 130, alpha: 1 }, 2000)
            .start().
            onComplete(this.Waiting.bind(this));
    }

    /** Timer */
    private Waiting(): void {
        console.log("waiting");
        new Tween(this.award).to({}, 2000).start().onComplete(this.NextStage.bind(this));
    }

    /** Función que pasa al turno siguiente */
    public NextStage(): void {
        sound.stop("GameBGM");
        sound.stop("ItemBGM");
        SceneManager.changeScene(new MapScene());
    }
}

