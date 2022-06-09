import { Container, Sprite, Texture } from "pixi.js";

export class PointButton extends Container{

        private def: Texture;
        private down: Texture;
        private over: Texture;
        private spr: Sprite;

    constructor(def:Texture, down:Texture, over:Texture){
        
        super();
        this.def = def;
        this.down = down;
        this.over = over;
                
        {this.spr=Sprite.from(def);
        this.spr.anchor.set(0.5);
        this.addChild(this.spr);
        }

        {this.spr.interactive =true;
        this.spr.on("pointerdown", this.onPointerDown, this)
        this.spr.on("pointerup", this.onPointerUp, this)
        this.spr.interactive=true
        this.spr.buttonMode=true
        this.spr.on("pointerover",this.onPointerOver, this)
        this.spr.on("pointerout",this.onPointerOut, this)
        }
    }

  /* PARA QUE EL pointer HAGA CLICK */
    private onPointerDown():void {
        console.log("pointer down");
        this.emit("pointer down");
        this.spr.texture=this.down; 
    }
    private onPointerUp():void {
        this.emit("pointerClick");
        this.spr.texture=this.over; 
    }

    /* PARA QUE SE DE CUENTA QUE LE PASO POR ARRIBA */
    private onPointerOver():void {
        console.log("pointer over");
        this.spr.texture=this.over; 
    }
    private onPointerOut():void {
        console.log("pointer out");
        this.spr.texture=this.def; 
    }
        
}
    