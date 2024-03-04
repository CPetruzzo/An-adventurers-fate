// import { sound } from "@pixi/sound";
import { Text, TextStyle, Container, NineSlicePlane, Texture } from "pixi.js";
import { Tween } from "tweedle.js";
import { stopSFX, SoundNames } from "./SoundParams";
import { DIALOG_ALPHA } from "./constants";

export class DialogBox extends Container {
  private text: Text;
  private style: TextStyle;
  private background: NineSlicePlane;
  public mostrarEscrito: boolean = false;

  constructor(x: number, y: number, width: number, height: number, style?: TextStyle) {
    super();

    this.position.set(x, y);

    this.style = style || new TextStyle({
      fontFamily: "Arial",
      fontSize: 16,
      fill: "white",
      wordWrap: true,
      wordWrapWidth: width - 20 // Ancho del cuadro menos el padding
    });

    this.background = new NineSlicePlane(
      Texture.from("EMPTY_BUTTON"),
      200,
      200,
      200,
      200,
    );

    this.background.width = width;
    this.background.height = height;
    this.background.pivot.set(this.background.width / 2, this.background.height / 2);
    this.addChild(this.background);

    this.text = new Text("", this.style);
    this.text.position.set(10, 10); // Padding
    this.text.anchor.set(0.5);
    this.addChild(this.text);

    this.hide();
  }

  public setText(text: string, _textSpeed?: number): void {
    this.text.text = text;
    if (_textSpeed) {
      this.writeText(text, _textSpeed);
    } else {
      this.writeText(text);
    }
  }

  public setStyle(style: TextStyle): void {
    this.style = style;
    this.text.style = style;
  }

  private writeText(text: string, _textSpeed?: number): void {
    this.text.text = text;
    const subtexto = this.text.text.split('');

    if (this.mostrarEscrito) {
      this.show();
      let delay = _textSpeed ? _textSpeed : 200;

      for (let i = 0; i < subtexto.length; i++) {
        setTimeout(() => {
          new Tween({})
            .to({}, delay)
            .onUpdate(() => {
              this.showText();
              const partialText = subtexto.slice(0, i + 1).join('');
              this.text.text = partialText;
            })
            .start()
            .onComplete(() => {
              if (i == this.text.text.length - 1) {
                this.mostrarEscrito = false;
                if (!this.mostrarEscrito) {
                  this.hide(); // Oculta el texto cuando termina de escribirse
                }
                stopSFX(SoundNames.JUMP);
              }
            });
          // sound.play(SoundNames.JUMP, { speed: 2, volume: 0.1 });
        }, delay);
        delay += 50;
      }
    }
  }

  private showText(): void {
    this.text.visible = true;
    this.text.alpha = DIALOG_ALPHA;
  }

  public show(): void {
    this.background.alpha = DIALOG_ALPHA;
  }

  public hide(): void {
    this.background.alpha = 0;
    this.text.alpha = 0;
    console.log('this.text.alpha', this.text.alpha)
  }
}
