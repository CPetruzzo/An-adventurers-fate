import { BitmapText, Container } from "pixi.js";


export class GenericText extends Container {

    public bitmaptext: BitmapText;
    private script: string;
    public font: string;
    private size: number;
    
    constructor(script:string, font:string, size:number) {

        super();

        this.script=script;
        this.font=font;
        this.size=size;

        this.bitmaptext = new BitmapText(this.script, { fontName: this.font, fontSize: this.size });
        this.bitmaptext.position.set(40, 40);
        this.addChild(this.bitmaptext);
    }

    public setText(script:string){
        this.script= script;
        this.bitmaptext.text= this.script;
    }

}