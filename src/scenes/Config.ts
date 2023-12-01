// import { sound } from "@pixi/sound";
import { Sprite, Text, Texture } from "pixi.js";
// import { Tween } from "tweedle.js";
// import Typed from "typed.js";
import { PointButton } from "../ui/PointButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameStartScene } from "./GameStartScene";
import { LETRA1, LETRA1SUBTITLE, LETRA1TITLE } from "../utils/constants";
import { ConfigInfo } from "../ui/ConfigInfo";
import { getGlobalVolume } from "../utils/SoundParams";
import { Player } from "../games/Player";

export class Config extends SceneBase {
  private buttonMouse: PointButton;
  public mostrarEscrito: boolean = false;
  private settings: Sprite;
  private title: Text;
  private control1: Text;
  private control2: Text;
  private control3: Text;
  private control4: Text;
  private control5: Text;
  private control6: Text;
  private control7: Text;

  constructor() {
    super();
    this.settings = Sprite.from("B6");

    this.buttonMouse = new PointButton(
      Texture.from("BACK.png"),
      Texture.from("BACK hundido.png"),
      Texture.from("BACK.png")
    );
    this.buttonMouse.x = 650;
    this.buttonMouse.y = 670;
    this.buttonMouse.scale.x = 0.5;
    this.buttonMouse.scale.y = 0.5;
    this.buttonMouse.on("pointerClick", this.onButtonClick, this);

    this.title = new Text("Settings", LETRA1TITLE);
    this.title.position.set(520, 100);

    this.control1 = new Text("Movement:", LETRA1SUBTITLE);
    this.control1.position.set(150, 320);

    this.control2 = new Text("Jump: KeyW / click Main hability", LETRA1);
    this.control2.position.set(600, 400);

    this.control3 = new Text("Crawl: KeyS / click arrowDown", LETRA1);
    this.control3.position.set(150, 480);

    this.control4 = new Text("Left: KeyA / click arrowLeft", LETRA1);
    this.control4.position.set(150, 560);

    this.control5 = new Text("Right: KeyD / click arrowRight", LETRA1);
    this.control5.position.set(150, 400);

    this.control6 = new Text("Punch: KeyJ / click button A", LETRA1);
    this.control6.position.set(600, 480);

    this.control7 = new Text("Range Attack: KeyK / click button B", LETRA1);
    this.control7.position.set(600, 560);

    this.addChild(
      this.settings,
      this.title,
      this.control1,
      this.control2,
      this.control3,
      this.control4,
      this.control5,
      this.control6,
      this.control7,
      this.buttonMouse
    );

    const volumeInfo = new ConfigInfo({
      name: "Volume",
      min: 0,
      max: 1,
      current: getGlobalVolume(),
      step: 0.1,
    });
    volumeInfo.position.set(400, 300);
    this.addChild(volumeInfo);

    const playerHP = new ConfigInfo({
      name: "PlayerHP",
      min: 100,
      max: 1000,
      current: Player._maxHealth,
      step: 100,
    });
    playerHP.position.set(400, 500);
    this.addChild(playerHP);

    const playerATK = new ConfigInfo({
      name: "PlayerHP",
      min: 100,
      max: 1000,
      current: Player._strength,
      step: 100,
    });
    playerATK.position.set(400, 600);
    this.addChild(playerATK);
  }

  public update(): void {}

  //BUTTON.TS            HACER FUNCIONAR EL NUEVO BOTÓN
  private onButtonClick(): void {
    console.log("Apreté volver", this);
    SceneManager.changeScene(new GameStartScene());
  }
}
