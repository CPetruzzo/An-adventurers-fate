import { sound } from "@pixi/sound";
import { Sprite, Texture } from "pixi.js";
import { PointButton } from "../ui/PointButton";
import { ToggleButton } from "../ui/ToggleButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameStartScene } from "./GameStartScene";
import { Keyboard } from "../utils/Keyboard";
import { createPointButton, createSprite } from "../utils/FunctionManager";
import { createText } from "../utils/TextParams";
import { LETRA7 } from "../utils/constants";

export class GameOverScene extends SceneBase {
  private buttonSound: ToggleButton;
  private BG: Sprite;
  private lose: PointButton;

  constructor() {
    super();

    //Habillity Circle

    this.BG = createSprite({ texture: "LOSE", anchor: { x: 0.5, y: 0.5 }, scale: { x: 1.25, y: 1.25 }, position: { x: SceneManager.WIDTH * 0.5, y: SceneManager.HEIGHT * 0.11 } })

    const tryAgain = createText({text: "Don't give up, try again, you can do it", style: LETRA7, position: {x: SceneManager.WIDTH * 0.5, y: SceneManager.HEIGHT * 0.2}})
    tryAgain.anchor.set(0.5);
    tryAgain.style.align = "center";

    // Sound ON-OFF
    this.buttonSound = new ToggleButton(
      Texture.from("lineDark12.png"),
      Texture.from("lineDark14.png")
    );
    this.buttonSound.height = 70;
    this.buttonSound.width = 70;
    this.buttonSound.x = 1150;
    this.buttonSound.y = 40;
    this.buttonSound.on(ToggleButton.TOGGLE_EVENT, (newState) => {
      console.log("toggle changed to:", newState);
    });

    this.lose = createPointButton({ textureClick: "EMPTY_BUTTON", textureNameDef: "EMPTY_BUTTON", textureOver: "EMPTY_BUTTON", x: 200, y: 500, scale: 0.2 }, "pointerClick", this.onLoseClick, this, "Go Back")

    Keyboard.down.on("Enter", () => this.onLoseClick());

    this.addChild(this.BG, tryAgain, this.buttonSound, this.lose);
  }

  public onLoseClick(): void {
    console.log("Apreté Config", this);
    SceneManager.changeScene(new GameStartScene());
    sound.stop("PartingBGM");
  }

  public update(): void { }
}
