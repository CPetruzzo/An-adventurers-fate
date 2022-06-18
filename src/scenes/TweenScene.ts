import { AnimatedSprite, Container, Texture } from "pixi.js";
import {  Tween } from "tweedle.js";

export class TweenScene extends Container {

    private box: AnimatedSprite;
    private closebox: AnimatedSprite;

    constructor() {


        super();

        this.box = new AnimatedSprite([
            Texture.from("nro1.png"),
            Texture.from("nro2.png"),
            Texture.from("nro3.png"),
            Texture.from("nro4.png"),
            Texture.from("nro5.png"),
        ], true
        );
        this.box.loop = false;
        this.box.visible = true;
        this.box.animationSpeed = 0.15;
        this.box.position.set(300, 130);
        this.box.play();
        this.addChild(this.box);

        this.closebox = new AnimatedSprite([
            Texture.from("nro5.png"),
            Texture.from("nro4.png"),
            Texture.from("nro3.png"),
            Texture.from("nro2.png"),
            Texture.from("nro1.png"),
        ], true
        );
        this.closebox.loop = false;
        this.closebox.visible = true;
        this.closebox.animationSpeed = 0.15;
        this.closebox.position.set(700, 130);
        this.closebox.play();
    

        new Tween(this.box)
            .to({ x: 700, alpha: 1 }, 1000,)
            .start()
            .onComplete(this.ClosingIt.bind(this));

    }

    public ClosingIt(): void {
        console.log("Opened complete, now it's time to close it");
        this.removeChild(this.box);
        this.addChild(this.closebox);
        this.closebox.position.x=700;
        this.closebox.gotoAndPlay(0);
        new Tween(this.closebox)
        .from({ x: 700})
            .to({ x: 300 }, 1000)
            .start()
            .onComplete(this.Opening.bind(this));
    }

    public Opening(): void {
        console.log("Maybe close it again");
        this.removeChild(this.closebox);
        this.addChild(this.box);
        this.box.position.x=300;
        this.box.gotoAndPlay(0);
        new Tween(this.box)
        .from({ x: 300})
            .to({ x: 700 }, 1000)
            .start().
            onComplete(this.ClosingIt.bind(this));
    }
}