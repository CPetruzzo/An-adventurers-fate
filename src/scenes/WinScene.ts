import { sound } from "@pixi/sound";
import { AnimatedSprite, Container, Sprite, Texture } from "pixi.js";
import { Tween } from "tweedle.js";
import { PointButton } from "../ui/PointButton";
import { SceneManager, Timer } from "../utils/SceneManager";
import { MapScene } from "./MapScene";
import { SoundNames, playSound, stopAllSFX, stopSounds } from "../utils/SoundParams";
import { Level } from "../utils/Level";
import { Inventory, InventoryItem, Weapon } from "../games/Inventory";
import { SpecialItem } from "../games/Items/SpecialItem";
import { TransitionScene, TransitionTypes } from "../utils/TransitionScene";
import { TRANSITION_TIME } from "../utils/constants";

export class WinScene extends Container {
    private box: PointButton;
    public finish: boolean = false;
    private openingBox: AnimatedSprite;
    private award: Sprite;
    public winStage: boolean = false;

    constructor() {
        super();
        stopAllSFX();
        console.log("lalala", Level.Complete)

        const background = Sprite.from("EMPTY_BANNER");
        background.anchor.set(0.5);
        background.position.set(background.width * 0.63, background.height * 0.4)
        const screenRelation = SceneManager.WIDTH / background.width;
        background.scale.set(screenRelation);
        this.addChild(background);

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
        this.openingBox.animationSpeed = 0.1;
        this.openingBox.position.set(400, 130);

        // IMAGEN DEL PREMIO
        switch (Level.CurrentLevel) {
            case 1:
                this.award = new Sprite(Texture.from("itemSword"));
                this.award.position.set(500, 230);
                this.award.scale.set(0.2);
                this.award.alpha = 0;
                break;
            case 2:
                this.award = new Sprite(Texture.from("scroll"));
                this.award.position.set(500, 230);
                this.award.rotation = Math.PI / 2;
                this.award.scale.set(0.7);
                this.award.alpha = 0;
                break;
            case 3:
                this.award = new Sprite(Texture.from("scroll"));
                this.award.position.set(500, 230);
                this.award.rotation = Math.PI / 2;
                this.award.scale.set(0.7);
                this.award.alpha = 0;
                break;
            default:
                this.award = new Sprite(Texture.from("itemSword"));
                this.award.position.set(500, 230);
                this.award.scale.set(0.2);
                this.award.alpha = 0;
                break;
        }

    }

    public update(deltaTime: number) {
        this.openingBox.update(deltaTime);
    }

    /** Flag que activa la caja */
    public flagBox() {
        this.winStage = true;
    }

    /** Función que se activa cuando hacés click en la caja */
    public onBoxClick(): void {
        this.removeChild(this.box);
        this.addChild(this.openingBox);
        this.openingBox.play();
        playSound(SoundNames.CHEST, {});
        new Tween(this.openingBox).to({}, 1000).start().onComplete(this.getAward.bind(this));
    }

    /** Función que hace salir la espada (premio) */
    private getAward(): void {
        this.addChild(this.award);
        this.award.visible = true;

        stopSounds([SoundNames.CHEST]);
        playSound(SoundNames.ITEM, { volume: 0.2 })

        new Tween(this.award)
            .to({ x: 400, y: 130, alpha: 1 }, 2000)
            .start().
            onComplete(this.Waiting.bind(this));
    }

    /** Timer */
    private Waiting(): void {
        let item: InventoryItem;
        console.log("waiting");
        switch (Level.CurrentLevel) {
            case 1:
                // Agregar una espada al inventario desde una escena
                item = new Weapon("Sword", "A sharp blade", 1, 10);
                console.log('item', item);
                break;
            case 2:
                item = new SpecialItem(1);
                console.log('item', item);
                break;
            case 3:
                item = new SpecialItem(1);
                console.log('item', item);
                break;
            default:
                item = new SpecialItem(1);
                console.log('item', item);
                break;
        }
        Inventory.getInstance().addItem(item);
        Timer(2000, this.nextStage.bind(this));
    }


    /** Función que pasa al turno siguiente */
    public nextStage(): void {
        sound.stop("GameBGM");
        sound.stop("ItemBGM");
        SceneManager.changeScene(new MapScene(), new TransitionScene(TRANSITION_TIME, TransitionTypes.FADE));
    }
}

