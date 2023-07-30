import { sound } from "@pixi/sound";
import { Sprite, Text, Texture } from "pixi.js";
import { Tween } from "tweedle.js";
import { PointButton } from "../ui/PointButton";
import { ToggleButton } from "../ui/ToggleButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { Config } from "./Config";
import { MapScene } from "./MapScene";
import { TextScene } from "./TextScene";
import { LETRA3 } from "../utils/constants";
import { configParams, createPointButton, startParams, textSceneParams } from "../utils/ButtonParams";

export class GameStartScene extends SceneBase {
    private titulo: Text;
    private textscene: PointButton;
    private buttonSound: ToggleButton;
    private BG: Sprite;
    private config: PointButton;
    private start: PointButton;

    constructor() {
        super();

        const BGM = sound.find("StartBGM");
        BGM.play({ loop: true, volume: 0.05 })

        this.BG = new Sprite(Texture.from("GameStartScene1.png"));
        this.BG.scale.set(2.9);
        this.BG.position.set(0, 0);
        
        this.config = createPointButton(configParams, "pointerClick", () => this.onConfigClick())
        this.start = createPointButton(startParams, "pointerClick", () => this.onStartClick());
        this.textscene = createPointButton(textSceneParams, "pointerClick", () => this.onTextClick());
        
        // Sound ON-OFF
        this.buttonSound = new ToggleButton(
            Texture.from("lineDark12.png"),
            Texture.from("lineDark14.png"));
        this.buttonSound.height = 70;
        this.buttonSound.width = 70;
        this.buttonSound.x = 1150
        this.buttonSound.y = 40
        this.buttonSound.on(ToggleButton.TOGGLE_EVENT, (newState) => {
            console.log("toggle changed to:", newState)
        })

        this.titulo = new Text("An adventurer's fate", LETRA3);
        this.titulo.position.set(SceneManager.WIDTH / 2, 200);
        this.titulo.anchor.set(0.5)
        new Tween(this.titulo.style).to({ dropShadowDistance: 2 }, 1500).repeat(Infinity).yoyo(true).start();

        this.addChild(this.BG, this.buttonSound, this.config, this.start, this.textscene, this.titulo);

        new Tween(this.BG).from({ x: 0, y: 0 }).to({ x: 0, y: -500 }, 15000).start().onComplete(this.BGdown.bind(this));
    }

    public update(): void { }

    private onTextClick(): void {
        console.log("Apreté Config", this);
        SceneManager.changeScene(new TextScene());
        sound.stop("StartBGM");
    }

    private onConfigClick(): void {
        console.log("Apreté Config", this);
        SceneManager.changeScene(new Config());
        sound.stop("StartBGM");
    }

    private onStartClick(): void {
        console.log("Apreté Config", this);
        SceneManager.changeScene(new MapScene());
        sound.stop("StartBGM");
    }

    private BGdown(): void {
        new Tween(this.BG).from({ x: 0, y: -500 }).to({ x: 0, y: 0 }, 15000).start().onComplete(this.BGup.bind(this));
    }

    private BGup(): void {
        new Tween(this.BG).from({ x: 0, y: 0 }).to({ x: 0, y: -500 }, 15000).start().onComplete(this.BGdown.bind(this));
    }
}