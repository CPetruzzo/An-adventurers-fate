import { sound } from "@pixi/sound";
import { Container, Sprite, Texture } from "pixi.js";
import { ChangeScene } from "..";
import { PointButton } from "../ui/PointButton";
import { ToggleButton } from "../ui/ToggleButton";
import { GameStartScene } from "./GameStartScene";

export class GameOverScene extends Container {

    private buttonSound: ToggleButton;
    private BG: Sprite;
    private lose: PointButton;

    constructor() {
        super();

        //Habillity Circle
        this.BG=new Sprite(Texture.from("LOSE"));
        
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

        this.lose= new PointButton(Texture.from("BACK.png"),
        Texture.from("BACK hundido.png"),
        Texture.from("BACK.png"))
        this.lose.x = 650
        this.lose.y = 400
        this.lose.scale.x=0.5;
        this.lose.scale.y=0.5;
        this.lose.on("pointerClick", this.onLoseClick, this)

        this.addChild(
            this.BG,
            this.buttonSound,
            this.lose,
            )
    }
    onLoseClick(): void {
        console.log("Apreté Config", this);
        ChangeScene(new GameStartScene());
        this.removeChild(this);
        sound.stop("PartingBGM");
    }
}
