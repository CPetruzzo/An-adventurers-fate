import { Container } from "pixi.js";
import { Tween } from "tweedle.js";
import { Arrow } from "./Arrow";

export class ArrowShooter extends Container {
    public arrowsArray: Array<Arrow>;

    constructor() {
        super();
        this.arrowsArray = [];
    }

    public createArrow(playerPosX: number, playerPosY: number): void {
        const newArrow: Arrow = new Arrow();
        this.addChild(newArrow);
        newArrow.x = playerPosX;
        newArrow.y = playerPosY;
        new Tween(newArrow).to({ x: playerPosX + 1000 }, 500).start().onComplete(() => {
            this.removeChild(newArrow);
            newArrow.destroy();
        });
        this.arrowsArray.push(newArrow);
    }
}