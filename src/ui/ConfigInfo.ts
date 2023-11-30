import { Container, Graphics, Text } from "pixi.js";
import { createText } from "../utils/TextParams";
import { LETRA1 } from "../utils/constants";

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
  private plus: Graphics;
  private minus: Graphics;

  constructor(configParam: ConfigParams) {
    super();

    this.paramName = configParam.name;
    this.step = configParam.step;
    this.min = configParam.min;
    this.current = configParam.current;
    this.max = configParam.max;

    this.textTitle = createText({
      text: this.paramName,
      style: LETRA1,
      position: { x: 200, y: -100 },
    });
    this.textTitle.anchor.set(0.5);

    this.minText = createText({
      text: this.min.toString(),
      style: LETRA1,
      position: { x: 0, y: 0 },
    });

    this.maxText = createText({
      text: this.max.toString(),
      style: LETRA1,
      position: { x: 400, y: 0 },
    });

    this.plus = new Graphics();
    this.plus.beginFill(0x0ff00, 1);
    this.plus.drawCircle(0, 0, 30);
    this.plus.endFill();
    this.plus.position.set(this.maxText.x, this.maxText.y);
    this.plus.pivot.set(this.plus.width/2, this.plus.height/2)
    this.plus.interactive = true;
    this.plus.buttonMode = true;

    this.minus = new Graphics();
    this.minus.beginFill(0xff0000, 1);
    this.minus.drawCircle(0, 0, 30);
    this.minus.endFill();
    this.minus.pivot.set(this.minus.width/2, this.minus.height/2)
    this.minus.position.set(this.minText.x, this.minText.y);
    this.minus.interactive = true;
    this.minus.buttonMode = true;

    this.handle = new Graphics();
    this.handle.beginFill(0xffffff, 1);
    this.handle.drawRect(-60, -8, 60, 16);
    this.handle.endFill();
    this.handle.pivot.set(this.handle.width/2, this.handle.height/2)
    this.handle.position.set(this.current * (400 / (this.max - this.min)), 0);

    this.plus.on("pointerdown", () => {
      if (this.current + this.step <= this.max) {
        this.current += this.step;
        console.log("this.current", this.current);
        this.updateHandlePosition();
      } else {
        console.log("Max");
      }
    });

    this.minus.on("pointerdown", () => {
      if (this.current - this.step >= this.min) {
        this.current -= this.step;
        console.log("this.current", this.current);
        this.updateHandlePosition();
      } else {
        console.log("Min");
      }
    });

    this.addChild(this.textTitle, this.minText, this.maxText, this.handle);
    this.addChild(this.plus, this.minus);
  }

  public moveHandle(): void {
    const value = Math.round((this.current / this.max) * 256);
    this.handle.position.set(value, this.maxText.y);
  }

  public updateHandlePosition(): void {
    const value = Math.round((this.current / this.max) * 256);
    this.handle
      .clear()
      .lineStyle(2, 0xffffff)
      .beginFill(value, 1)
      .drawRect(-60, -8, 60, 16);
      this.handle.position.set(this.current * (400 / (this.max - this.min)), 0);
  }
}
