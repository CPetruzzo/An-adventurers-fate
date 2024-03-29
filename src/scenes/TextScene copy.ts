// import { sound } from "@pixi/sound";
import { sound } from "@pixi/sound";
import { Graphics, Text, TextStyle, Texture } from "pixi.js";
import { Tween } from "tweedle.js";
import { PointButton } from "../ui/PointButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameStartScene } from "./GameStartScene";
import { Keyboard } from "../utils/Keyboard";
import { SoundNames, playSFX, stopSFX } from "../utils/SoundParams";

export class TextScene extends SceneBase {
  private buttonMouse: PointButton;
  public mostrarEscrito: boolean = false;
  public title: Text;
  public panelTexto: Graphics;
  public buttonText: PointButton;
  public fondo: Graphics;
  public title2: Text;
  public panelTexto2: Graphics;

  constructor() {
    super();

    this.fondo = new Graphics();
    this.fondo.beginFill(0xff3, 1);
    this.fondo.drawRect(0, SceneManager.HEIGHT - 350, SceneManager.WIDTH, 350);
    this.fondo.endFill();

    const TangerineTitle = new TextStyle({
      fontFamily: "Letra5",
      fontSize: 100,
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

    this.buttonText.on("pointerClick", this.onButtonText, this);

    //TEXTO
    this.title = new Text(
      "",
      TangerineTitle
    );
    this.title.position.x = 0;
    this.title.position.y = SceneManager.HEIGHT - 250;

    this.title2 = new Text(
      "",
      TangerineTitle
    );
    this.title2.position.x = SceneManager.WIDTH / 2 - this.title2.width / 2;
    this.title2.position.y = SceneManager.HEIGHT - 150;

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
      this.buttonMouse,
      // this.panelTexto,
      // this.panelTexto2,
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

  // private onButtonText() {
  //   this.soundWriting();
  //   new Tween(this.panelTexto)
  //     .to({ x: 1280 }, 7500)
  //     .start()
  //     .onComplete(this.onButtonText2.bind(this));
  // }

  soundWriting() {
    playSFX(SoundNames.WRITE, {});
  }

  onButtonText2() {
    new Tween(this.title).to({ alpha: 0 }, 2500).start();
    new Tween(this.panelTexto2)
      .to({ x: 1280 }, 7500)
      .start()
      .onComplete(this.onButtonTextStop.bind(this));
  }

  onButtonTextStop() {
    new Tween(this.title2)
      .to({ alpha: 0 }, 2000)
      .start()
      .onComplete(this.onButtonTextStop.bind(this));
  }

  public update(): void { }

  //BUTTON.TS   HACER FUNCIONAR EL NUEVO BOTÓN
  private onButtonClick(): void {
    console.log("Apreté volver", this);
    stopSFX(SoundNames.WRITE);
    SceneManager.changeScene(new GameStartScene());
  }

  private onButtonText(): void {
    this.mostrarEscrito = true;
    console.log("apreté el texto");
    console.log(this.mostrarEscrito);
    const texto: string = "Hola, soy un texto";
    const subtexto = texto.split('');

    if (this.mostrarEscrito) {
        console.log("mostrando escrito");

        let delay = 0;
        for (let i = 0; i < subtexto.length; i++) {
            setTimeout(() => {
                new Tween({ val: 0 })
                    .to({ val: 1 }, 100)
                    .onUpdate(() => {
                        const partialText = subtexto.slice(0, i + 1).join('');
                        this.title.text = partialText;
                        console.log('this.title.text', this.title.text)
                    })
                    .start();
                sound.play("PotionSound1");
            }, delay);
            delay += 100; // Incrementa el retraso para la siguiente letra
        }
    }
}



  // codigo para escribir letras de un texto una por una

  //         const textoescrito = new Text(subtexto[i], {
  //             fontFamily: "Arial",
  //             fontSize: "50px",
  //             fill: "white",
  //             align: "center",
  //             wordWrap: true,
  //             lineHeight: 50,
  //             padding: 10,
  //             stroke: "black",
  //             strokeThickness: 5,
  //             dropShadow: true,
  //             dropShadowColor: "black",
  //             dropShadowBlur: 4,
  //             dropShadowAngle: Math.PI / 6,
  //             dropShadowDistance: 6,
  //             wordWrapWidth: this.width - 100,
  //         });
  //         this.addChild(textoescrito);
  //         textoescrito.position.set(200,200);
  //     }
  // }

  private soundText() {
      sound.play("PotionSound1");
  }

  public Waiting(): void {
      console.log("waiting");
      new Tween(this.buttonText).to({}, 3000).start();
      this.soundText();

  }
}

// private aux: HTMLDivElement;

// let str:string= "Hola, soy un texto que va a ser mostrado en pantalla.\n"
// let currentText = new Tween(this.str.substring(0, str.length-1)).to({},3000).start();
// this.textOnScreen = new Text(`${currentText}`, { fontSize: 40, fontFamily: ("Arial") });
// this.addChild(this.textOnScreen);

// this.addChild(str);

// this.aux= document.createElement("div");
// const text = new Typed(this.aux, {
//     strings: [subtexto],
//     typeSpeed: 50,
//     loop: false,
//     showCursor: false,
//     startDelay: 1000,
//     onStringTyped: () => {
//         console.log("String typed");
//     }
//  });
//  text.start();
