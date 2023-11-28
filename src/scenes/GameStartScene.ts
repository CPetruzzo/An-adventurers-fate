import { Sprite, Texture, IDestroyOptions } from "pixi.js";
import { Tween } from "tweedle.js";
import { PointButton } from "../ui/PointButton";
import { ToggleButton } from "../ui/ToggleButton";
import {
  createPointButton,
  startParams,
  configParams,
  textSceneParams,
} from "../utils/ButtonParams";
import { Keyboard } from "../utils/Keyboard";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { playSound, stopAllSounds } from "../utils/SoundParams";
import { createSprite } from "../utils/SpriteParams";
import { createText } from "../utils/TextParams";
import { LETRA3 } from "../utils/constants";
import { Config } from "./Config";
import { MapScene } from "./MapScene";
import { TextScene } from "./TextScene";
import { Text } from "pixi.js";

export class GameStartScene extends SceneBase {
  private titulo: Text;
  private textscene: PointButton;
  private buttonSound: ToggleButton;
  private BG: Sprite;
  private config: PointButton;
  private start: PointButton;
  private buttons: PointButton[];
  private currentButton: number;

  constructor() {
    super();

    playSound("StartBGM", { loop: true, volume: 0.05 });

    this.BG = createSprite({
      texture: "GameStartScene1.png",
      scale: { x: 2.9, y: 2.9 },
      position: { x: 0, y: 0 },
    });

    this.buttons = [];
    this.start = createPointButton(startParams, "pointerClick", () =>
      this.onStartClick()
    );
    this.start.name = "start";
    this.config = createPointButton(configParams, "pointerClick", () =>
      this.onConfigClick()
    );
    this.config.name = "settings";
    this.textscene = createPointButton(textSceneParams, "pointerClick", () =>
      this.onTextClick()
    );
    this.textscene.name = "about";
    this.buttons.push(this.start, this.config, this.textscene);

    this.currentButton = 0;

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

    this.titulo = createText({
      text: "An adventurer's fate",
      style: LETRA3,
      position: { x: SceneManager.WIDTH / 2, y: 200 },
    });
    this.titulo.anchor.set(0.5);
    new Tween(this.titulo.style)
      .to({ dropShadowDistance: 2 }, 1500)
      .repeat(Infinity)
      .yoyo(true)
      .start();

    this.addChild(
      this.BG,
      this.buttonSound,
      this.config,
      this.start,
      this.textscene,
      this.titulo
    );

    new Tween(this.BG)
      .from({ x: 0, y: 0 })
      .to({ x: 0, y: -500 }, 15000)
      .start()
      .onComplete(this.BGdown.bind(this));

    this.initKeyboardEvents(true);
  }

  public update(): void {
    switch (this.buttons[this.currentButton].name) {
      case "start":
        this.start.spr.tint = 0x00ffff;
        this.config.spr.tint = 0xffffff;
        this.textscene.spr.tint = 0xffffff;
        break;
      case "settings":
        this.start.spr.tint = 0xffffff;
        this.config.spr.tint = 0x00ffff;
        this.textscene.spr.tint = 0xffffff;
        break;
      case "about":
        this.start.spr.tint = 0xffffff;
        this.config.spr.tint = 0xffffff;
        this.textscene.spr.tint = 0x00ffff;
        break;
      default:
        this.start.spr.tint = 0x00ffff;
        this.config.spr.tint = 0xffffff;
        this.textscene.spr.tint = 0xffffff;
        break;
    }
  }

  public override destroy(
    options: boolean | IDestroyOptions | undefined
  ): void {
    super.destroy(options);
    this.initKeyboardEvents(false);
  }

  private initKeyboardEvents(state: boolean): void {
    if (state) {
      // Asignación de eventos de teclado
      Keyboard.down.on("ArrowDown", () => {
        if (this.currentButton < this.buttons.length - 1) {
          this.currentButton++;
        } else {
          this.currentButton = 0;
        }
      });

      Keyboard.down.on("ArrowUp", () => {
        if (this.currentButton > 0) {
          this.currentButton--;
        } else {
          this.currentButton = this.buttons.length - 1;
        }
      });

      Keyboard.down.on("Enter", () => {
        switch (this.buttons[this.currentButton].name) {
          case "start":
            this.onStartClick();
            break;
          case "settings":
            this.onConfigClick();
            break;
          case "about":
            this.onTextClick();
            break;
        }
      });
    } else {
      Keyboard.down.off("ArrowDown", () => {});

      Keyboard.down.off("ArrowUp", () => {});

      Keyboard.down.off("Enter", () => {});
    }
  }

  private onTextClick(): void {
    console.log("Apreté Config", this);
    stopAllSounds();
    SceneManager.changeScene(new TextScene());
  }

  private onConfigClick(): void {
    stopAllSounds();
    SceneManager.changeScene(new Config());
  }

  private onStartClick(): void {
    stopAllSounds();
    SceneManager.changeScene(new MapScene());
  }

  private BGdown(): void {
    new Tween(this.BG)
      .from({ x: 0, y: -500 })
      .to({ x: 0, y: 0 }, 15000)
      .start()
      .onComplete(this.BGup.bind(this));
  }

  private BGup(): void {
    new Tween(this.BG)
      .from({ x: 0, y: 0 })
      .to({ x: 0, y: -500 }, 15000)
      .start()
      .onComplete(this.BGdown.bind(this));
  }
}
