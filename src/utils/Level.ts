import { Container } from "pixi.js";

export class Level extends Container {
    public static CanPlay: number = 1;
    public static CurrentLevel: number;
    constructor(){
        super();
    }
}