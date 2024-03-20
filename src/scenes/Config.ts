import { Sprite, Text } from "pixi.js";
import { PointButton } from "../ui/PointButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameStartScene } from "./GameStartScene";
import { LETRA6 } from "../utils/constants";
import { ConfigInfo } from "../ui/ConfigInfo";
import { getGlobalVolume } from "../utils/SoundParams";
import { createPointButton } from "../utils/FunctionManager";

export class Config extends SceneBase {
  private buttonMouse: PointButton;
  public mostrarEscrito: boolean = false;
  private settings: Sprite;
  private title: Text;
  constructor() {
    super();
    this.settings = Sprite.from("CONFIG_BG");
    this.settings.scale.set(1.6);
    this.settings.position.set(this.settings.width / 2 - 85, this.settings.height / 2);
    this.settings.anchor.set(0.5);

    this.buttonMouse = createPointButton({
      textureClick: "EMPTY_BUTTON", textureNameDef: "EMPTY_BUTTON", textureOver: "EMPTY_BUTTON", x: SceneManager.WIDTH / 2, y: 600, scale: 0.2
    }, "pointerClick", () => this.onButtonClick(), this, "Return", LETRA6);

    this.title = new Text("Settings", LETRA6);
    this.title.position.set(50, 50);
    this.title.scale.set(0.5);

    this.addChild(
      this.settings,
      this.title,
      this.buttonMouse
    );

    const volumeInfo = new ConfigInfo({
      name: "Volume",
      min: 0,
      max: 1,
      current: getGlobalVolume(),
      step: 0.1,
    });
    volumeInfo.position.set(SceneManager.WIDTH / 2 - volumeInfo.width / 4, 380);
    this.addChild(volumeInfo);
  }

  public update(): void { }

  private onButtonClick(): void {
    console.log("Apreté volver", this);
    SceneManager.changeScene(new GameStartScene());
  }
}
