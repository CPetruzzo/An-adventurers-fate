import { Container } from "pixi.js";
// import { PopUpParams, createPopUp } from "./PopUps";

export class Trigger extends Container {
    constructor() {
        super();
    }

    
    public activate(doSomething: void): void {
        doSomething;
    }
}
