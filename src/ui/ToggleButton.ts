import { sound } from "@pixi/sound";
import { Container, Texture } from "pixi.js";
import { PointButton } from "./PointButton";

export class ToggleButton extends Container{
    public static readonly TOGGLE_EVENT:string = "toggledButtonEvent";
    private btnOn:PointButton;
    private btnOff:PointButton;
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

        this.btnOn = new PointButton(texUp, texDown, texUp);
        this.btnOff = new PointButton(texDown, texUp, texDown);

        this.btnOn.on("pointerClick", this.toggle, this);
        this.btnOff.on("pointerClick", this.toggle, this);

        this.btnOff.visible = false;

        this.addChild(this.btnOn,this.btnOff);
    }

    public toggle(){
        this.state = !this.state;
        this.emit(ToggleButton.TOGGLE_EVENT, this.state);
        sound.toggleMuteAll();
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