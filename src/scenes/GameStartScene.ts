import { sound } from "@pixi/sound";
import {  Sprite, Texture } from "pixi.js";
// import { ChangeScene } from "..";
import { PointButton } from "../ui/PointButton";

import { ToggleButton } from "../ui/ToggleButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { Config } from "./Config";
import { MapScene } from "./MapScene";
// import { Config } from "./Config";
// import { GameScene } from "./GameScene";
// import { MapScene } from "./MapScene";

export class GameStartScene extends SceneBase {

    public update(): void {}

    private buttonSound: ToggleButton;
    private BG: Sprite;
    private config: PointButton;
    private start: PointButton;

    constructor() {
        super();

        const BGM = sound.find("StartBGM");
        BGM.play({loop:true, volume:0.05})
        
        this.BG=new Sprite(Texture.from("An adventurer's fate (1).png"));

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

        this.config= new PointButton(Texture.from("CONFIG.png"),
        Texture.from("CONFIG hundido.png"),
        Texture.from("CONFIG.png"))
        this.config.x = 650
        this.config.y = 500
        this.config.scale.x=0.5;
        this.config.scale.y=0.5;
        this.config.on("pointerClick", this.onConfigClick, this)

        this.addChild(
            this.BG,
            this.buttonSound,
            this.config,
            )

            this.start= new PointButton(Texture.from("START.png"),
            Texture.from("START hundido.png"),
            Texture.from("START.png"))
            this.start.x = 650
            this.start.y = 400
            this.start.scale.x=0.5;
            this.start.scale.y=0.5;
            this.start.on("pointerClick", this.onStartClick, this)
    
            this.addChild(
                this.BG,
                this.buttonSound,
                this.config,
                this.start
                )
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

}