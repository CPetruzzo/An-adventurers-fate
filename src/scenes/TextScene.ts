import { Graphics, Text, TextStyle, Texture } from "pixi.js";
import { Tween } from "tweedle.js";
import { PointButton } from "../ui/PointButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameStartScene } from "./GameStartScene";
import { Keyboard } from "../utils/Keyboard";
import { SoundNames, playSFX, stopSFX } from "../utils/SoundParams";
import { sound } from "@pixi/sound";

export class TextScene extends SceneBase {
  private buttonMouse: PointButton;
  public mostrarEscrito: boolean = false;
  public buttonText: PointButton;
  public fondo: Graphics;

  public title: Text;
  public title2: Text;
  public title3: Text = new Text("");

  public panelTexto: Graphics;
  public panelTexto2: Graphics;

  constructor() {
    super();

    this.fondo = new Graphics();
    this.fondo.beginFill(0xff3, 1);
    this.fondo.drawRect(0, SceneManager.HEIGHT - 350, SceneManager.WIDTH, 350);
    this.fondo.endFill();

    const TangerineTitle = new TextStyle({
      fontFamily: "Letra5",
      fontSize: 60,
      fill: 0x111,
    });

    this.buttonMouse = new PointButton(
      Texture.from("BACK.png"),
      Texture.from("BACK hundido.png"),
      Texture.from("BACK.png")
    );
    this.buttonMouse.x = SceneManager.WIDTH - this.buttonMouse.width / 4;
    this.buttonMouse.y = this.buttonMouse.height / 4;
    this.buttonMouse.scale.x = 0.5;
    this.buttonMouse.scale.y = 0.5;
    this.buttonMouse.on("pointerClick", this.onButtonClick, this);

    this.buttonText = new PointButton(
      Texture.from("READ"),
      Texture.from("READ hundido.png"),
      Texture.from("READ.png")
    );
    this.buttonText.scale.x = 0.5;
    this.buttonText.scale.y = 0.5;
    this.buttonText.x = this.fondo.width - this.buttonText.width / 2;
    this.buttonText.y =
      SceneManager.HEIGHT - this.fondo.height + this.buttonText.height / 2;
    // this.buttonText.on("pointerClick", this.showText, this);
    this.buttonText.on("pointerClick", this.onButtonText, this);


    // "This is Arek the great's story, the one that nobody",
    this.title = new Text(
      "This is a way that tweens alpha value",
      TangerineTitle
    );
    this.title.position.x = SceneManager.WIDTH / 2 - this.title.width / 2;
    this.title.position.x = 0;
    this.title.position.y = SceneManager.HEIGHT - 300;

    this.title2 = new Text(
      "This is another way that tweens mask position",
      TangerineTitle
    );
    this.title2.position.x = 0;
    this.title2.position.y = this.title.y + this.title.height;

    this.title3 = new Text(
      "",
      TangerineTitle
    );
    this.title3.position.x = 0;
    this.title3.position.y = this.title2.y + this.title2.height;


    this.panelTexto = new Graphics();
    this.panelTexto.beginFill(0xff3, 1);
    this.panelTexto.drawRect(
      this.title.position.x + this.title.width,
      this.title.position.y,
      -this.title.width,
      this.title.height
    );
    this.panelTexto.endFill();

    this.panelTexto2 = new Graphics();
    this.panelTexto2.beginFill(0xff3, 1);
    this.panelTexto2.drawRect(
      this.title2.position.x + this.title2.width,
      this.title2.position.y,
      -this.title2.width,
      this.title.height
    );
    this.panelTexto2.endFill();

    Keyboard.down.on("Backspace", () => {
      this.onButtonClick();
    });

    Keyboard.down.off("Backspace", () => { });

    this.addChild(
      this.fondo,
      this.title,
      this.title2,
      this.title3,
      this.buttonMouse,
      this.panelTexto,
      this.panelTexto2,
      this.buttonText
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

  public onButtonText() {
    this.soundWriting();
    new Tween(this.panelTexto)
      // .to({ x: 1280 }, 3500)
      .to({ alpha: 0 }, 2500)
      .start()
      .onComplete(this.onButtonText2.bind(this));
  }

  private soundWriting(): void {
    playSFX(SoundNames.WRITE, {});
  }

  private onButtonText2(): void {
    new Tween(this.title).to({ alpha: 0 }, 2500).start();
    new Tween(this.panelTexto2)
      .to({ x: this.title2.width }, 2500)
      .start()
      .onComplete(this.onButtonTextStop.bind(this));
  }

  private onButtonTextStop(): void {
    new Tween(this.title2)
      .to({ alpha: 0 }, 2000)
      .start()
      .onComplete(() => {
        this.showText();
      });
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
              console.log('this.title.text', this.title.text)
            })
            .start()
            .onComplete(() => {
              if (i == texto.length - 1) {
                new Tween(this.title3).to({ alpha: 0 }, 1500).start();
                stopSFX(SoundNames.WRITE);
              }
            });
          sound.play(SoundNames.POTION);
        }, delay);
        delay += 50;
      }
    }
  }
}