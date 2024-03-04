import {
  Container, Graphics,
  //  NineSlicePlane,
  Sprite, Text,
  //  Texture 
} from "pixi.js";
import { createText } from "../utils/TextParams";
import { LETRA4 } from "../utils/constants";
import { getGlobalVolume, setVolume } from "../utils/SoundParams";
import { Player, setPlayerHeight } from "../games/Player";
import { createSprite, getPlayerHeight, setValue } from "../utils/FunctionManager";

export interface ConfigParams {
  name: string;
  min: number;
  max: number;
  step: number;
  current: number;
  function?: void;
}

export class ConfigInfo extends Container {
  private paramName: string;
  private step: number;
  private min: number;
  private max: number;
  private handle: Graphics;
  private textTitle: Text;
  private minText: Text;
  private maxText: Text;
  public current: number;
  private plus: Sprite;
  private minus: Sprite;

  constructor(configParam: ConfigParams, _functionToApply?: void) {
    super();

    this.paramName = configParam.name;
    this.step = configParam.step;
    this.min = configParam.min;
    this.current = configParam.current;
    this.max = configParam.max;

    this.textTitle = createText({
      text: this.paramName,
      style: LETRA4,
      position: { x: 150, y: -200 },
    });
    this.textTitle.anchor.set(0.5);

    this.minText = createText({
      text: this.min.toString(),
      style: LETRA4,
      position: { x: -115, y: 15 },
    });

    this.maxText = createText({
      text: this.max.toString(),
      style: LETRA4,
      position: { x: 400, y: 15 },
    });

    this.plus = createSprite({ texture: "minus", position: { x: 255, y: 108 }, scale: { x: 0.08, y: 0.08 }, anchor: { x: 0.5, y: 0.5 } })
    this.plus.interactive = true;
    this.plus.buttonMode = true;

    this.minus = createSprite({ texture: "minus", position: { x: 35, y: 108 }, scale: { x: 0.08, y: 0.08 }, anchor: { x: 0.5, y: 0.5 } })
    this.minus.interactive = true;
    this.minus.buttonMode = true;

    this.handle = new Graphics();
    this.handle.beginFill(0xffffff, 1);
    this.handle.drawRect(-60, 10, 60, 110);
    this.handle.endFill();
    this.handle.pivot.set(this.handle.width / 2, this.handle.height / 2);
    this.handle.position.set(this.current * (400 / (this.max - this.min)), 0);

    // const barBG = new NineSlicePlane(
    //   Texture.from("barBG"),
    //   1024 * 0.4 * 0.1,
    //   1024 * 0.4 * 0.3,
    //   1024 * 0.4 * 0.1,
    //   1024 * 0.4 * 0.3,
    // );

    // console.log('barBG', barBG.width, barBG.height)
    // barBG.width = 1024 * 2 * 0.4;
    // barBG.height = 1024 * 1.5* 0.4;

    // barBG.pivot.set(barBG.width / 2, barBG.height / 2)
    // barBG.x = 200;
    // barBG.y = 0;

    this.plus.on("pointerdown", () => {
      if (this.current + this.step <= this.max) {
        this.current += this.step;
        console.log("this.current", this.current);
        this.updateHandlePosition();
        switch (this.paramName) {
          case "Volume":
            this.updateVolume();
            break;
          case "PlayerHP":
            Player._maxHealth = this.current;
            break;
          case "PlayerATK":
            Player._strength = this.current;
            break;
          case "PlayerHEIGHT":
            this.updatePlayerHeight();
            break;
          default:
            break;
        }
      } else {
        console.log("Max");
      }
    });

    this.minus.on("pointerdown", () => {
      if (this.current - this.step >= this.min) {
        this.current -= this.step;
        console.log("this.current", this.current);
        this.updateHandlePosition();
        switch (this.paramName) {
          case "Volume":
            this.updateVolume();
            break;
          case "PlayerHP":
            Player._maxHealth = this.current;
            break;
          case "PlayerATK":
            Player._strength = this.current;
            break;
          case "PlayerHEIGHT":
            this.updatePlayerHeight();
            break;
          default:
            break;
        }
      } else {
        console.log("Max");
      }
    });

    this.addChild(
      this.textTitle,
      this.minText,
      this.maxText,
      this.handle,
      // barBG
    );
    this.addChild(this.plus, this.minus);
  }

  /** moves the slider handler */
  public moveHandle(): void {
    const value = Math.round((this.current / this.max) * 256);
    this.handle.position.set(value, this.handle.y + 20);
  }

  /** updates handle position on screen according to moveHandle */
  public updateHandlePosition(): void {
    const value = Math.round((this.current / this.max) * 256);
    this.handle
      .clear()
      .lineStyle(2, 0xffffff)
      .beginFill(value, 1)
      .drawRect(-60, 10, 60, 110);
    this.handle.position.set(this.current * (400 / (this.max - this.min)), 0);
    console.log("this.handle.y", this.handle.y);
  }

  /** changes volume, updates the saved volume in localstorage and shows current volume level */
  private updateVolume(): void {
    setVolume(this.current);
    setValue("volume", this.current.toString());
    console.log(getGlobalVolume());;
  }

  private updatePlayerHeight(): void {
    setPlayerHeight(this.current);
    console.log(getPlayerHeight());
  }
}
