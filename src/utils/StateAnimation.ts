import { AnimatedSprite, Container, Texture } from "pixi.js";

export class StateAnimation extends Container {

    private states: Map<string, AnimatedSprite> = new Map();
    private animContainer: Container = new Container();

    constructor() {
        super();
        this.addChild(this.animContainer);
    }

    public playState(name: string, restart: boolean = true) {

        this.animContainer.removeChildren();
        const current = this.states.get(name);
        if (current) {
            this.animContainer.addChild(current);
            if (restart) {
                current.gotoAndPlay(0);
            }
        }
    }

    public addState(name: string, frames: Texture[] | string[], animationSpeed: number, loop: boolean = true) {

        const texArray: Texture[] = [];
        for (const tex of frames) {
            if (typeof tex == "string") {
                texArray.push(Texture.from(tex));
            }
            else {
                texArray.push(tex);
            }
        }
        let tempAnim: AnimatedSprite = new AnimatedSprite(texArray);
        tempAnim.anchor.set(0.5);
        tempAnim.animationSpeed = animationSpeed;
        tempAnim.loop = loop;
        tempAnim.play();
        this.states.set(name, tempAnim);

    }

    public update(frames: number) {
        for (const states of this.states.values()) {
            states.update(frames);
        }

    }

}