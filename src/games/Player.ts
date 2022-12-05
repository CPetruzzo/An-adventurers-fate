import { sound } from "@pixi/sound";
import { Graphics, IDestroyOptions, ObservablePoint, Rectangle, Text } from "pixi.js";
import { Tween } from "tweedle.js";

import { Keyboard } from "../utils/Keyboard";
import { StateAnimation } from "../utils/StateAnimation";
import { IHitBox } from "./IHitBox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Player extends PhysicsContainer implements IHitBox {


    private static readonly GRAVITY = 1000;
    private static readonly MOVE_SPEED = 350;
    public canJump = true;
    private hitbox: Graphics;
    public healthOnScreen: Text;
    public currentHealth: number = 100;
    public maxHealth: number = 100;
    public canPunch: boolean= true;
    public punchDamage: number = 2;
    private bardo: StateAnimation;
    


    constructor() {
        super();

        this.bardo = new StateAnimation();
        this.bardo.scale.set(2)
        this.bardo.pivot.set(0.55,17);

        this.bardo.addState("run",
        [
            "adventurer-run2-00.png",
            "adventurer-run2-01.png",
            "adventurer-run2-02.png",
            "adventurer-run2-03.png",
            "adventurer-run2-04.png",
            "adventurer-run2-05.png",
        ], 
        0.1, true
        )

        this.bardo.addState("hurted",
        [
            "adventurer-knock-down-00",
            "adventurer-knock-down-01",
            "adventurer-knock-down-02",
            "adventurer-knock-down-03",
            "adventurer-knock-down-04",
            "adventurer-knock-down-05",
            "adventurer-knock-down-06",
        ],
        0.1,true
        )
        
        this.bardo.addState("getUp", [
            "adventurer-get-up-00.png",
            "adventurer-get-up-01.png",
            "adventurer-get-up-02.png",
            "adventurer-get-up-03.png",
            "adventurer-get-up-04.png",
            "adventurer-get-up-05.png",
            "adventurer-get-up-06.png",
        ], 0.1, true)

        this.bardo.addState("punch",
        [
            "adventurer-punch-00.png",
            "adventurer-punch-01.png",
            "adventurer-punch-02.png",
            "adventurer-punch-03.png",
            "adventurer-punch-04.png",
            "adventurer-punch-05.png",
        ], 0.1, true)
        
        this.bardo.addState("runPunch",
        [
            "adventurer-run-punch-00.png",
            "adventurer-run-punch-01.png",
            "adventurer-run-punch-02.png",
            "adventurer-run-punch-03.png",
            "adventurer-run-punch-04.png",
            "adventurer-run-punch-05.png",
            "adventurer-run-punch-06.png",
        ],0.1,true)

        this.bardo.addState("idle",
            ["adventurer-walk-00.png"],
        0.05,true)

        this.bardo.addState("crawl",
        [
            "adventurer-crouch-walk-00.png",
            "adventurer-crouch-walk-01.png",
            "adventurer-crouch-walk-02.png",
            "adventurer-crouch-walk-03.png",
            "adventurer-crouch-walk-04.png",
            "adventurer-crouch-walk-05.png",
        ], 0.1,true)

        //BARDO JUMP 
        this.bardo.addState("jump",[
            "adventurer-drop-kick-00.png",
            "adventurer-drop-kick-01.png",
            "adventurer-drop-kick-02.png",
            "adventurer-drop-kick-03.png",
        ], 0.05, false
        )
    
        this.bardo.addState("bow",
            ["adventurer-bow-00.png",
            "adventurer-bow-01.png",
            "adventurer-bow-02.png",
            "adventurer-bow-03.png",
            "adventurer-bow-04.png",
            "adventurer-bow-05.png",
            "adventurer-bow-06.png",
            "adventurer-bow-07.png",
            "adventurer-bow-08.png",
        ],0.1,true )
        
        // BARDO BOW
        this.bardo.addState("jumpBow",
        [
            "adventurer-bow-jump-00.png",
            "adventurer-bow-jump-01.png",
            "adventurer-bow-jump-02.png",
            "adventurer-bow-jump-03.png",
            "adventurer-bow-jump-04.png",
            "adventurer-bow-jump-05.png",
        ], 0.1, true
        )

        // PUNTO GUÍA
        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0, 0, 5);
        auxZero.endFill();

        // CAJAS
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0);
        this.hitbox.drawRect(-20, -56, 40, 56);
        this.hitbox.endFill();

        this.acceleration.y = Player.GRAVITY;

        // MOVIMIENTOS
        Keyboard.down.on("KeyW", this.jump, this);
        Keyboard.down.on("KeyS", this.crawl, this);
        Keyboard.down.on("KeyD", this.runRight, this);
        Keyboard.down.on("KeyA", this.runLeft, this);
        Keyboard.down.on("KeyJ", this.punch, this);
        Keyboard.down.on("KeyL", this.bow, this);
        Keyboard.down.on("KeyK", this.jumpBow, this);

        // Keyboard.up.on("KeyW", this.stopJump, this);
        // Keyboard.up.on("KeyS", this.stopCrawl, this);
        Keyboard.up.on("KeyD", this.stopRunRight, this);
        Keyboard.up.on("KeyA", this.stopRunLeft, this);
        // Keyboard.up.on("KeyJ", this.stopPunch, this);
        Keyboard.up.on("KeyL", this.stopBow, this);
        Keyboard.up.on("KeyK", this.stopJumpBow, this);

        // this.addChild(auxZero);
        this.addChild(this.hitbox);

        // agrego todos los movimientos a la clase player
        this.addChild(
            this.bardo
        );
        

        let initialHealth: number = 100;
        let currentHealth: number = initialHealth;
        this.healthOnScreen = new Text(`${currentHealth}` + "HP", { fontSize: 40, fontFamily: ("Arial") });
        // this.addChild(this.healthOnScreen);
        this.healthOnScreen.x = -60;
        this.healthOnScreen.y = -130;

    }

    // ESTO ES PARA QUE CUANDO DESTRUYA EL PLAYER TAMBIÉN SE BORRE EL MÉTODO DE SALTAR KEYBOARD DOWN ARROW UP ----> THIS.JUMP
    public override destroy(options: boolean | IDestroyOptions | undefined) {
        super.destroy(options);

        Keyboard.down.off("KeyW", this.jump, this);
        Keyboard.down.off("KeyS", this.crawl, this);
        Keyboard.down.off("KeyD", this.runRight, this);
        Keyboard.down.off("KeyA", this.runLeft, this);
        Keyboard.down.off("KeyJ", this.punch, this);
        Keyboard.down.off("KeyL", this.bow, this);
        Keyboard.down.off("KeyK", this.jumpBow, this);
        
        Keyboard.up.off("KeyW", this.stopJump, this);
        Keyboard.up.off("KeyS", this.stopCrawl, this);
        Keyboard.up.off("KeyD", this.stopRunRight, this);
        Keyboard.up.off("KeyA", this.stopRunLeft, this);
        Keyboard.up.off("KeyJ", this.stopPunch, this);
        Keyboard.up.off("KeyL", this.stopBow, this);
        Keyboard.up.off("KeyK", this.stopJumpBow, this);


    }


    //  MOVIMIENTOS
    public override update(deltaMS: number) {
        super.update(deltaMS / 1000);
        this.bardo.update(deltaMS / (1000 / 60));
        // lo que es lo mismo que deltaseconds/(1/60)
        // this.bardoJump.update(deltaMS / (1000 / 60)); // esto es para saber cuantos frames pasaron (que deberían ser 1)
        // this.bardoIdle.update(deltaMS / (1000 / 60));
        // this.bardoWalk.update(deltaMS / (1000 / 60));
        // this.bardoCrawl.update(deltaMS / (1000 / 60));
        // this.bardoPunch.update(deltaMS / (1000 / 60));
        // this.bardoRunPunch.update(deltaMS / (1000 / 60));
        // this.bardoBow.update(deltaMS / (1000 / 60));
        // this.bardoJumpBow.update(deltaMS / (1000 / 60));
    }


    //  FUNCION AUXILIAR (SI NO LA TENGO SEPARADA NO PUEDO BORRARLA CUANDO ELIMINE A PLAYER)
    public jump() {
        if (this.canJump) {
            // console.log("apreté la W!", this);
            this.speed.y = -(Player.GRAVITY * 0.7)
            this.canJump = false;
            this.bardo.playState("jump", true)
            // this.bardoJump.visible = true;
            // this.bardoIdle.visible = false;
            // this.bardoWalk.visible = false;
            // this.bardoCrawl.visible = false;
            // this.bardoPunch.visible = false;
            // this.bardoRunPunch.visible = false;
            // this.bardoBow.visible = false;
            // this.bardoJumpBow.visible = false;
            // this.bardoJump.gotoAndPlay(0);
        }
    }

    public crawl() {
        // console.log("apreté la S!", this);
        this.bardo.playState("crawl", true)
        // this.bardoCrawl.visible = true;
        // this.bardoJump.visible = false;
        // this.bardoIdle.visible = false;
        // this.bardoWalk.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoRunPunch.visible = false;
        // this.bardoBow.visible = false;
        // this.bardoJumpBow.visible = false;
        this.removeChild(this.hitbox);
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0);
        this.hitbox.drawRect(-20, -40, 50, 40);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    public runLeft() {
        // console.log("apreté la A!", this);

        const run = sound.find("running");
        run.play({ loop: true, volume: 0.05 })
        this.speed.x = -Player.MOVE_SPEED;
        this.scale.set(-2, 2);
        this.bardo.playState("run");
        // this.bardoWalk.visible = true;
        // this.bardoIdle.visible = false;
        // this.bardoJump.visible = false;
        // this.bardoCrawl.visible = false;
        // this.bardoRunPunch.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoBow.visible = false;
        // this.bardoJumpBow.visible = false;
    }

    public runRight() {
        // console.log("apreté la D!", this);
        const run = sound.find("running");
        run.play({ loop: true, volume: 0.05 })
        this.speed.x = Player.MOVE_SPEED;
        this.scale.set(2, 2);
        this.bardo.playState("run", true)
        // this.bardoWalk.visible = true;
        // this.bardoIdle.visible = false;
        // this.bardoJump.visible = false;
        // this.bardoCrawl.visible = false;
        // this.bardoRunPunch.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoBow.visible = false;
        // this.bardoJumpBow.visible = false;
    }

    public punch() {
        if(this.canPunch) {
        // console.log("apreté la J!", this);
        this.speed.x = this.speed.x * 2;
        this.bardo.playState("punch");
        this.canPunch=false;
        this.punchDamage = 2;
        new Tween(this.bardo).to({ }, 550).start().onComplete(() => {
            this.canPunch=true;
            this.stopPunch();
        } );
        // this.bardoJump.visible = false;
        // this.bardoIdle.visible = false;
        // this.bardoWalk.visible = false;
        // this.bardoCrawl.visible = false;
        // this.bardoRunPunch.visible = false;
        // this.bardoBow.visible = false;
        // this.bardoJumpBow.visible = false;

        // this.bardoPunch.visible = true;
        // this.bardoPunch.gotoAndPlay(0);
        // this.bardoPunch.play();

        this.canPunch=false;
        this.punchDamage = 2;
        // new Tween(this.bardoPunch).to({ }, 550).start().onComplete(() => {
        //     this.canPunch=true;
        //     this.stopPunch();
        // } );
    }
}

    public punchRun() {
        // console.log("apreté la J!", this);

        
        const atkbow = sound.find("bow");
        atkbow.play({ loop: true, volume: 0.05 })
        
        this.speed.x = this.speed.x * 2;
        this.bardo.playState("runPunch",true)
        // this.bardoJump.visible = false;
        // this.bardoIdle.visible = false;
        // this.bardoWalk.visible = false;
        // this.bardoCrawl.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoRunPunch.visible = true;
        // this.bardoRunPunch.gotoAndPlay(0);
        // this.bardoBow.visible = false;
        // this.bardoJumpBow.visible = false;
    }

    public idlePlayer() {
        // console.log("ninguna tecla presionada", this);
        this.speed.x = 0;
        this.bardo.playState("idle",true)
        // this.bardoJump.visible = false;
        // this.bardoIdle.visible = true;
        // this.bardoWalk.visible = false;
        // this.bardoCrawl.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoRunPunch.visible = false;
    }

    public fall(){
        this.bardo.playState("hurted")
        // this.bardoHurted.visible = true;
        // this.bardoIdle.visible = false;
        // this.bardoWalk.visible = false;
        // this.bardoJump.visible = false;
        // this.bardoCrawl.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoRunPunch.visible = false;
    }

    public bow(){
    this.bardo.playState("bow", false)
        // this.bardoBow.visible = true;
        // this.bardoIdle.visible = false;
        // this.bardoWalk.visible = false;
        // this.bardoJump.visible = false;
        // this.bardoCrawl.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoRunPunch.visible = false;
        // this.bardoBow.gotoAndPlay(0);
        // this.bardoJumpBow.visible = false;
    }

    public jumpBow(){  
        this.bardo.playState("jumpBow", false)
        // this.bardoJumpBow.visible = true;
        // this.bardoIdle.visible = false;
        // this.bardoWalk.visible = false;
        // this.bardoJump.visible = false;
        // this.bardoCrawl.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoRunPunch.visible = false;
        // this.bardoBow.visible = false;
        // this.bardoJumpBow.gotoAndPlay(0);    
    }

    private stopJump() {
        // console.log("solté la W!", this);
        this.bardo.playState("idle",true)
        // this.bardoCrawl.visible = false;
        // this.bardoJump.visible = false;
        // this.bardoIdle.visible = true;
        // this.bardoWalk.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoRunPunch.visible = false;
    }

    private stopCrawl() {
        this.bardo.playState("idle",true)
        // console.log("solté la S!", this);
        this.speed.x = 0;
        // this.bardoCrawl.visible = false;
        // this.bardoJump.visible = false;
        // this.bardoIdle.visible = true;
        // this.bardoWalk.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoRunPunch.visible = false;
        this.removeChild(this.hitbox);
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0);
        this.hitbox.drawRect(-20, -56, 40, 56);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    private stopRunLeft() {
        // console.log("solté la A!", this);
        sound.stop("running");
        this.speed.x = 0;
        this.scale.set(-2, 2);
        this.bardo.playState("idle",true)
        // this.bardoWalk.visible = false;
        // this.bardoIdle.visible = true;
        // this.bardoJump.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoRunPunch.visible = false;
    }

    private stopRunRight() {
        // console.log("solté la D!", this);
        sound.stop("running");
        this.speed.x = 0;
        this.scale.set(2, 2);
        this.bardo.playState("idle",true)
        // this.bardoWalk.visible = false;
        // this.bardoIdle.visible = true;
        // this.bardoJump.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoRunPunch.visible = false;
    }

    public stopPunch() {
        // console.log("solté la J!", this);
        this.speed.x = this.speed.x / 2;
        this.bardo.playState("idle",true)
        // this.bardoJump.visible = false;
        // this.bardoIdle.visible = true;
        // this.bardoWalk.visible = false;
        // this.bardoCrawl.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoRunPunch.visible = false;
    }

    private stopBow(){
        this.bardo.playState("idle",true)
        // this.bardoBow.visible = false;
        // this.bardoIdle.visible = true;
        // this.bardoWalk.visible = false;
        // this.bardoJump.visible = false;
        // this.bardoCrawl.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoRunPunch.visible = false;
    }

    private stopJumpBow(){
        this.bardo.playState("idle",true)
        // this.bardoJumpBow.visible = false;
        // this.bardoIdle.visible = true;
        // this.bardoWalk.visible = false;
        // this.bardoJump.visible = false;
        // this.bardoCrawl.visible = false;
        // this.bardoPunch.visible = false;
        // this.bardoRunPunch.visible = false;
        sound.stop("bow");
    }


    // me da la distancia desde el (0,0) al borde inicial de la hitbox
    public getHitBox(): Rectangle {
        return this.hitbox.getBounds();
    }

    //PARA SEPARAR JUGADORES DE SUS PLATAFORMAS
    public separate(overlap: Rectangle, platform: ObservablePoint<any>) {
        if (overlap.width < overlap.height) {
            if (this.x < platform.x) {
                this.x -= overlap.width;
            } else if (this.x > platform.x) {
                this.x += overlap.width;
            }
        }
        else {
            if (this.y > platform.y) {
                this.y += overlap.height;
                this.speed.y = 0;
            } else if (this.y < platform.y) {
                this.y -= overlap.height;
                this.speed.y = 0;
                this.canJump = true;
            }
        }
    }

    public getPlayerHurt(damage: number) {
        this.currentHealth -= damage;
        this.healthOnScreen.text = `${this.currentHealth}` + "HP";
        console.log("Player health: " + this.currentHealth);
    }

    public drinkPotion(healthRecovered: number) {
        this.currentHealth += healthRecovered;
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
        this.healthOnScreen.text = `${this.currentHealth}` + "HP";
        console.log("Player health: " + this.currentHealth);
    }
}
