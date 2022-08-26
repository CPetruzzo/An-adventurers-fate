import { sound } from "@pixi/sound";
import { Container, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { PointButton } from "../ui/PointButton";
import { ToggleButton } from "../ui/ToggleButton";
import { SceneManager } from "../utils/SceneManager";
import { GameStartScene } from "./GameStartScene";
import { MapScene } from "./MapScene";

export class PauseScene extends Container {

    private buttonSound: ToggleButton;
    // private BG: Sprite;
    private cartel: Sprite;
    button1: PointButton;
    button2: PointButton;
    salirSi: Text;
    salirNo: Text;
    reiniciar: Text;


    constructor() {
        super();

        // this.BG=new Sprite(Texture.from("PAUSA"));

        
        const Tangerine = new TextStyle({ fontFamily: "Tangerine", fontSize: 48, fill: 0X1819 });

        this.cartel = Sprite.from("Cartel");
        this.cartel.x = 470;
        this.cartel.y = 200;

        this.button1 = new PointButton(Texture.from("MapButtonOff"),
            Texture.from("MapButton"),
            Texture.from("MapButton"));
        this.button1.x = 630
        this.button1.y = 420
        this.button1.scale.x = 0.8;
        this.button1.scale.y = 0.8;
        this.button1.on("pointerClick", this.onCloseClick, this);

        this.button2 = new PointButton(Texture.from("MapButtonOff"),
            Texture.from("MapButton"),
            Texture.from("MapButton"));
        this.button2.x = 630;
        this.button2.y = 350;
        this.button2.scale.set(0.8)
        this.button2.on("pointerClick", this.onMenu, this);

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

        this.reiniciar = new Text("Pausado", Tangerine);
        this.reiniciar.position.set(560, 250);


        this.salirSi = new Text("Reiniciar", Tangerine);
        this.salirSi.position.set(560, 328);

        this.salirNo = new Text("Salir", Tangerine);
        this.salirNo.position.set(590, 396);


        this.addChild(
            // this.BG,
            this.buttonSound,
            this.cartel,
            this.button1,
            this.button2,
            this.salirNo,
            this.salirSi,
            this.reiniciar,
            )
    }

    private onCloseClick() {
        sound.stopAll();
        SceneManager.changeScene(new GameStartScene());
    }
    private onMenu() {
        sound.stopAll();
        SceneManager.changeScene(new MapScene());
    }
}
