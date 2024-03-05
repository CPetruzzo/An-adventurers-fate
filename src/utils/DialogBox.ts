import { Text, TextStyle, Container, NineSlicePlane, Texture } from "pixi.js";
import { stopSFX, SoundNames } from "./SoundParams";
import { DIALOG_ALPHA, TEXT_TIME_LETTER_BY_LETTER } from "./constants";
import { Timer } from "./SceneManager";

export class DialogBox extends Container {
  private text: Text;
  private style: TextStyle;
  private background: NineSlicePlane;
  public hiding: boolean = false;

  constructor(x: number, y: number, width: number, height: number, style?: TextStyle) {
    super();

    this.position.set(x, y);

    this.style = style || new TextStyle({
      fontFamily: "Arial",
      fontSize: 16,
      fill: "white",
      wordWrap: true,
      wordWrapWidth: width - 20, // Ancho del cuadro menos el padding
      align: "left"
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
    this.text.position.set(this.background.width, this.background.height / 3);
    this.background.addChild(this.text);

    if (this.text.style.wordWrapWidth) {
      this.text.x -= 7 * this.text.style.wordWrapWidth / 8;
    } else {
      const wordWrapWidthValue = 300;
      this.text.x -= 7 * wordWrapWidthValue / 8;
    }

    this.hide(true);
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
    if (this.hiding) {
      return; // Si ya se está ocultando el diálogo, no inicies una nueva escritura
    }

    this.show(); // Mostrar el cuadro de diálogo antes de escribir el texto
    this.hiding = true;

    const subtexto = text.split('');
    let partialText = '';

    let delay = _textSpeed ? _textSpeed : 100;
    let totalDelay = 0;

    for (let i = 0; i < subtexto.length; i++) {
      setTimeout(() => {
        this.showText();
        partialText += subtexto[i];
        this.text.text = partialText;
        
        if (i === subtexto.length - 1) {
          stopSFX(SoundNames.JUMP);
          this.hide();
        }
      }, totalDelay);

      totalDelay += delay;
    }
  }

  public show(): void {
    this.background.alpha = DIALOG_ALPHA;
  }

  public showText(): void {
    this.text.alpha = DIALOG_ALPHA;
  }

  public hide(now?: boolean): void {
    if (!now) {
      Timer(TEXT_TIME_LETTER_BY_LETTER, () => {
        this.background.alpha = 0;
        this.text.alpha = 0;
        this.hiding = false;
      });
    } else {
      this.background.alpha = 0;
      this.text.alpha = 0;
      this.hiding = false;
    }
  }
}
