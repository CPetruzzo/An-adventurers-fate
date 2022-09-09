import { sound } from "@pixi/sound";
import { Sprite, Text, TextStyle, Texture } from "pixi.js";
import { Tween } from "tweedle.js";
import { PointButton } from "../ui/PointButton";

import { ToggleButton } from "../ui/ToggleButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { Config } from "./Config";
import { MapScene } from "./MapScene";
import { TextScene } from "./TextScene";

export class GameStartScene extends SceneBase {
    private titulo: Text;
    private textscene: PointButton;

    public update(): void { }

    private buttonSound: ToggleButton;
    private BG: Sprite;
    private config: PointButton;
    private start: PointButton;

    constructor() {
        super();

        const letra = new TextStyle({ fontFamily: "Quintessential", fontSize: 100, fill: 0X1819 });

        const BGM = sound.find("StartBGM");
        BGM.play({ loop: true, volume: 0.05 })

        // this.BG=new Sprite(Texture.from("An adventurer's fate (1).png"));

        this.BG = new Sprite(Texture.from("GameStartScene1.png"));
        this.BG.scale.set(2.9);
        this.BG.position.set(0, 0);


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

        
        this.titulo = new Text("An adventurer's fate", letra);
        this.titulo.position.set(250,200);
        

        this.config = new PointButton(Texture.from("CONFIG.png"),
            Texture.from("CONFIG hundido.png"),
            Texture.from("CONFIG.png"))
        this.config.x = 650
        this.config.y = 500
        this.config.scale.x = 0.5;
        this.config.scale.y = 0.5;
        this.config.on("pointerClick", this.onConfigClick, this)

        new Tween(this.BG).from({x:0 , y: 0}).to({x:0 , y: -500},15000).start().onComplete(this.BGdown.bind(this));

        this.start = new PointButton(Texture.from("START.png"),
            Texture.from("START hundido.png"),
            Texture.from("START.png"))
        this.start.x = 650
        this.start.y = 400
        this.start.scale.x = 0.5;
        this.start.scale.y = 0.5;
        this.start.on("pointerClick", this.onStartClick, this)

        
        this.textscene = new PointButton(Texture.from("START.png"),
            Texture.from("START hundido.png"),
            Texture.from("START.png"))
        this.textscene.x = 650
        this.textscene.y = 600
        this.textscene.scale.x = 0.5;
        this.textscene.scale.y = 0.5;
        this.textscene.on("pointerClick", this.onTextClick, this)

        this.addChild(
            this.BG,
            this.buttonSound,
            this.config,
            this.start,
            this.textscene,
            this.titulo,
        )
    }
    onTextClick():void {
        console.log("Apreté Config", this);
        SceneManager.changeScene(new TextScene());
        sound.stop("StartBGM");
    }

    onConfigClick(): void {
        console.log("Apreté Config", this);
        SceneManager.changeScene(new Config());
        sound.stop("StartBGM");
    }

    onStartClick(): void {
        console.log("Apreté Config", this);
        SceneManager.changeScene(new MapScene());
        sound.stop("StartBGM");
    }

    BGdown(): void {
        new Tween(this.BG).from({x:0 , y: -500}).to({x:0 , y: 0},15000).start().onComplete(this.BGup.bind(this));
    }

    BGup(): void{
        new Tween(this.BG).from({x:0 , y: 0}).to({x:0 , y: -500},15000).start().onComplete(this.BGdown.bind(this));
    }

}