import { Container, Texture } from "pixi.js";
import { ChangeScene } from "..";
import { PointButton } from "../ui/PointButton";


import { GameStartScene } from "./GameStartScene";

export class Config extends Container {

    /* private buttonMouse: Sprite; */
    private buttonMouse: PointButton;


    constructor() {
        super();

        { /* START:                 COMO QUEDÓ EL BOTON DE START AL FINAL*/
            this.buttonMouse = new PointButton(Texture.from("BACK.png"),
                Texture.from("BACK hundido.png"),
                Texture.from("BACK.png"));
            this.buttonMouse.x = 650
            this.buttonMouse.y = 450
            this.buttonMouse.scale.x=0.5;
            this.buttonMouse.scale.y=0.5;
            this.buttonMouse.on("pointerClick", this.onButtonClick, this);


            { // ADD.CHILD:             AGREGANDO TODO CON ADDCHILDS
                this.addChild(this.buttonMouse);
            }
        }
    }

    //BUTTON.TS            HACER FUNCIONAR EL NUEVO BOTÓN  
    private onButtonClick(): void {
        console.log("Apreté volver", this);
        ChangeScene(new GameStartScene());
        this.removeChild(this);
    }
}