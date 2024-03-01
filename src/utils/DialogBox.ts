import { Text, TextStyle, Container, Graphics } from "pixi.js";

export class DialogBox extends Container {
    private text: Text;
    private style: TextStyle;

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

        this.text = new Text("", this.style);
        this.text.position.set(10, 10); // Padding
        this.addChild(this.text);

        const dialogGraphic = new Graphics();
        dialogGraphic.beginFill(0x000000, 0.7);
        dialogGraphic.drawRect(0, 0, width, height);
        dialogGraphic.endFill();
        this.addChildAt(dialogGraphic, 0);
    }

    setText(text: string): void {
        this.text.text = text;
    }

    setStyle(style: TextStyle): void {
        this.style = style;
        this.text.style = style;
    }
}
