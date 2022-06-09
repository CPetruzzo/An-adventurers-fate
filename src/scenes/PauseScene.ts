import { Container, Sprite, Texture } from "pixi.js";
import { ToggleButton } from "../ui/ToggleButton";

export class PauseScene extends Container {

    private buttonSound: ToggleButton;
    private BG: Sprite;


    constructor() {
        super();

        this.BG=new Sprite(Texture.from("PAUSA"));

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

        this.addChild(
            this.BG,
            this.buttonSound,
            )
    }
}
