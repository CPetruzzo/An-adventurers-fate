import { Container, Texture } from "pixi.js";
import { Button } from "./Button";

export class ToggleButton extends Container{
    public static readonly TOGGLE_EVENT:string = "toggledButtonEvent";
    private btnOn:Button;
    private btnOff:Button;
    private _state: boolean = true;
    public get state(): boolean {
        return this._state;
    }
    public set state(value: boolean) {
        this._state = value;
        this.fixState();
    }
    constructor(texUp:Texture, texDown:Texture){
        super();

        this.btnOn = new Button(texUp, texDown, texUp);
        this.btnOff = new Button(texDown, texUp, texDown);

        this.btnOn.on("buttonClick", this.toggle, this);
        this.btnOff.on("buttonClick", this.toggle, this);

        this.btnOff.visible = false;

        this.addChild(this.btnOn,this.btnOff);
    }

    public toggle(){
        this.state = !this.state;
        this.emit(ToggleButton.TOGGLE_EVENT, this.state);
    }

    private fixState() {
        if (this.state)
        {
            this.btnOff.visible = false;
            this.btnOn.visible = true;
        }
        else
        {
            this.btnOff.visible = true;
            this.btnOn.visible = false;
        }
    }
}