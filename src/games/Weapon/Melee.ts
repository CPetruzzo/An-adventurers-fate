import { Container, Graphics, Rectangle} from "pixi.js";
import { IHitBox } from "../IHitBox";


export class Melee extends Container implements IHitBox {
   
    private melee: Graphics;
    
    constructor(){
        super();
  
        this.melee=new Graphics();
        this.melee.beginFill(0x00FF00, 0);
        this.melee.drawRect(0,-50,60,50);
        this.melee.endFill();
        this.addChild(this.melee);

        const auxZero=new Graphics();
            auxZero.beginFill(0xFF00FF);
            auxZero.drawCircle(0,0,5);
            auxZero.endFill();
        // this.addChild(auxZero);
    }
    
    public getHitBox(): Rectangle
    {
        return this.melee.getBounds(); 
    }

    
    
}