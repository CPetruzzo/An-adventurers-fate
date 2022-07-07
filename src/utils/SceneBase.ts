import { Container } from "pixi.js";

export abstract class SceneBase extends Container{

    public abstract update(deltaFrame:number, deltaTime?:number):void

}
