import { sound } from "@pixi/sound";
import { Container, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { PointButton } from "../ui/PointButton";
import { ToggleButton } from "../ui/ToggleButton";
import { SceneManager } from "../utils/SceneManager";
import { GameStartScene } from "./GameStartScene";
import { MapScene } from "./MapScene";
import { button1, button2 } from "../utils/ButtonParams";
import { createPointButton } from "../utils/FunctionManager";

export class PauseScene extends Container {
    private buttonSound: ToggleButton;
    private cartel: Sprite;
    public button1: PointButton;
    public button2: PointButton;
    public salirSi: Text;
    public salirNo: Text;
    public reiniciar: Text;

    constructor() {
        super();

        // this.BG=new Sprite(Texture.from("PAUSA"));
        const PauseFont = new TextStyle({ fontFamily: "Letra2", fontSize: 50, fill: 0X1819 });

        this.cartel = Sprite.from("EMPTY_BANNER");
        this.cartel.anchor.set(0.5)
        this.cartel.x = SceneManager.WIDTH / 2;
        this.cartel.y = SceneManager.HEIGHT / 2;
        this.cartel.scale.set(0.7);

        this.button1 = createPointButton(button1, "pointerClick", () => this.onCloseClick());
        this.button2 = createPointButton(button2, "pointerClick", () => this.onMenu());

        // Sound ON-OFF
        this.buttonSound = new ToggleButton(
            Texture.from("lineDark12.png"),
            Texture.from("lineDark14.png"));
        this.buttonSound.height = 70;
        this.buttonSound.width = 70;
        this.buttonSound.x = 1150;
        this.buttonSound.y = 40;
        this.buttonSound.on(ToggleButton.TOGGLE_EVENT, (newState) => {
            console.log("toggle changed to:", newState)
        })

        this.reiniciar = new Text("Pausado", PauseFont);
        this.reiniciar.anchor.set(0.5)
        this.reiniciar.y = -this.cartel.height / 4
        this.salirSi = new Text("Salir", PauseFont);
        this.salirSi.anchor.set(0.5);
        this.salirNo = new Text("Reiniciar", PauseFont);
        this.salirNo.anchor.set(0.5);

        this.addChild(
            // this.BG,
            // this.buttonSound,
            this.cartel,
            this.button1,
            this.button2,
            this.reiniciar,
        )
        this.cartel.addChild(this.reiniciar);
        this.button1.addChild(this.salirSi);
        this.button2.addChild(this.salirNo);
    }

    private onCloseClick(): void {
        sound.stopAll();
        SceneManager.changeScene(new GameStartScene());
    }
    private onMenu(): void {
        sound.stopAll();
        SceneManager.changeScene(new MapScene());
    }
}
