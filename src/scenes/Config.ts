// import { sound } from "@pixi/sound";
import { Sprite, Text, Texture } from "pixi.js";
// import { Tween } from "tweedle.js";
// import Typed from "typed.js";
import { PointButton } from "../ui/PointButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameStartScene } from "./GameStartScene";
import { LETRA1, LETRA3, LETRA4 } from "../utils/constants";
import { ConfigInfo } from "../ui/ConfigInfo";
import { getGlobalVolume } from "../utils/SoundParams";
// import { Player } from "../games/Player";
// import { getPlayerHeight } from "../utils/FunctionManager";

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
    
    this.settings = Sprite.from("CONFIG_BG");
    this.settings.scale.set(1.3);
    this.settings.position.set(this.settings.width / 2, this.settings.height / 2 + 60);
    this.settings.anchor.set(0.5);

    this.buttonMouse = new PointButton(
      Texture.from("EMPTY_BUTTON"),
      Texture.from("EMPTY_BUTTON"),
      Texture.from("EMPTY_BUTTON")
    );
    this.buttonMouse.x = 650;
    this.buttonMouse.y = 600  ;
    this.buttonMouse.scale.x = 0.2;
    this.buttonMouse.scale.y = 0.2;
    this.buttonMouse.on("pointerClick", this.onButtonClick, this);

    this.title = new Text("Settings", LETRA3);
    this.title.position.set(50, 50);
    this.title.scale.set(0.5);

    this.control1 = new Text("Movement:", LETRA4);
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
      // this.control1,
      // this.control2,
      // this.control3,
      // this.control4,
      // this.control5,
      // this.control6,
      // this.control7,
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

    // const playerHP = new ConfigInfo({
    //   name: "PlayerHP",
    //   min: 100,
    //   max: 1000,
    //   current: Player._maxHealth,
    //   step: 100,
    // });
    // playerHP.position.set(400, 500);
    // this.addChild(playerHP);

    // const playerATK = new ConfigInfo({
    //   name: "playerATK",
    //   min: 100,
    //   max: 1000,
    //   current: Player._strength,
    //   step: 100,
    // });
    // playerATK.position.set(400, 650);
    // this.addChild(playerATK);

    // const playerHEIGHT = new ConfigInfo({
    //   name: "playerHEIGHT",
    //   min: 150,
    //   max: 250,
    //   current: getPlayerHeight(),
    //   step: 50,
    // });
    // playerHEIGHT.position.set(400, 350);
    // this.addChild(playerHEIGHT);
  }

  public update(): void { }

  //BUTTON.TS            HACER FUNCIONAR EL NUEVO BOTÓN
  private onButtonClick(): void {
    console.log("Apreté volver", this);
    SceneManager.changeScene(new GameStartScene());
  }
}
