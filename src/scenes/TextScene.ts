import { Sprite, Text } from "pixi.js";
import { Tween } from "tweedle.js";
import { PointButton } from "../ui/PointButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameStartScene } from "./GameStartScene";
import { Keyboard } from "../utils/Keyboard";
import { SoundNames, stopSFX } from "../utils/SoundParams";
import { sound } from "@pixi/sound";
import { LETRA6, LETRA7 } from "../utils/constants";
import { createPointButton } from "../utils/FunctionManager";
import { createText } from "../utils/TextParams";

export class TextScene extends SceneBase {
  private buttonMouse: PointButton;
  public mostrarEscrito: boolean = false;

  public title3: Text = new Text("");

  constructor() {
    super();

    const background = Sprite.from("PETRUZZO");
    background.anchor.set(0.5);
    background.scale.set(SceneManager.HEIGHT / background.height)
    background.position.set(SceneManager.WIDTH / 2, SceneManager.HEIGHT / 2)
    this.addChild(background);

    this.buttonMouse = createPointButton({ scale: 0.2, textureClick: "EMPTY_BUTTON", textureNameDef: "EMPTY_BUTTON", textureOver: "EMPTY_BUTTON", x: SceneManager.WIDTH - 100, y: 50 }, "pointerClick", this.onButtonClick, this, "Return", LETRA6);

    const myInfoES = createText({ text: `Este juego fue \ndesarrollado por \nFacundo Wegher`, style: LETRA7, position: { x: SceneManager.WIDTH * 0.5 - 225, y: 505 } });
    myInfoES.style.align = "center";
    myInfoES.alpha = 0;
    const myInfoEN = createText({ text: `This game was \ndeveloped by \nFacundo Wegher`, style: LETRA7, position: { x: SceneManager.WIDTH * 0.5 - 200, y: 505 } });
    myInfoEN.style.align = "center";
    this.addChild(myInfoEN, myInfoES);

    new Tween(myInfoEN)
      .delay(2500)
      .repeatDelay(2500)
      .to({ alpha: 0 }, 1500)
      .start()
      .yoyo(true)
      .repeat(Infinity)

    new Tween(myInfoES)
      .delay(2500)
      .repeatDelay(2500)
      .from({ alpha: 0 })
      .to({ alpha: 1 }, 1500)
      .start()
      .yoyo(true)
      .repeat(Infinity)

    Keyboard.down.on("Backspace", () => {
      this.onButtonClick();
    });

    Keyboard.down.off("Backspace", () => { });

    this.title3.style = LETRA6
    this.addChild(
      this.title3,
      this.buttonMouse,
    );
  }

  public initKeyboardEvents(state: boolean): void {
    if (state) {
      Keyboard.down.on("Backspace", () => {
        this.onButtonClick();
      });
    } else {
      Keyboard.down.off("Backspace", () => { });
    }
  }

  public update(): void { }

  private onButtonClick(): void {
    console.log("Apreté volver", this);
    stopSFX(SoundNames.WRITE);
    SceneManager.changeScene(new GameStartScene());
  }

  public showText(): void {
    this.mostrarEscrito = true;
    console.log("apreté el texto");
    console.log(this.mostrarEscrito);
    const texto: string = "This is a way, one by one";
    const subtexto = texto.split('');

    if (this.mostrarEscrito) {
      console.log("mostrando escrito");
      console.log('texto', texto)
      console.log('texto.length', texto.length)

      let delay = 100;
      for (let i = 0; i < subtexto.length; i++) {
        setTimeout(() => {
          new Tween({})
            .to({}, 50)
            .onUpdate(() => {
              const partialText = subtexto.slice(0, i + 1).join('');
              this.title3.text = partialText;
              console.log('this.title.text', this.title3.text)
            })
            .start()
            .onComplete(() => {
              if (i == texto.length - 1) {
                new Tween(this.title3).to({ alpha: 0 }, 1500).start();
                stopSFX(SoundNames.WRITE);
              }
            });
          sound.play(SoundNames.JUMP, { speed: 2, volume: 0.2 });
        }, delay);
        delay += 50;
      }
    }
  }
}