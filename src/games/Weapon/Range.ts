import { Container, Graphics, Rectangle} from "pixi.js";
import { IHitBox } from "../IHitBox";


export class Range extends Container implements IHitBox {
   
    private range: Graphics;
    
    constructor(){
        super();
  
        this.range=new Graphics();
        this.range.beginFill(0x00FF00, 0);
        this.range.drawRect(0,-50,120,50);
        this.range.endFill();
        this.addChild(this.range);

        const auxZero=new Graphics();
            auxZero.beginFill(0xFF00FF);
            auxZero.drawCircle(0,0,5);
            auxZero.endFill();
        // this.addChild(auxZero);
    }
    
    public getHitBox(): Rectangle
    {
        return this.range.getBounds(); 
    }

    
    
}