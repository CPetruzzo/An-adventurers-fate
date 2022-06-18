import { AnimatedSprite, Graphics, IDestroyOptions, ObservablePoint, Rectangle, Text, Texture } from "pixi.js";

import { Keyboard } from "../utils/Keyboard";
import { IHitBox } from "./IHitBox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Player extends PhysicsContainer implements IHitBox {


    private static readonly GRAVITY = 1000;
    private static readonly MOVE_SPEED = 350;
    public canJump = true;
    private hitbox: Graphics;
    private bardoWalk: AnimatedSprite;
    private bardoIdle: AnimatedSprite;
    private bardoJump: AnimatedSprite;
    private bardoCrawl: AnimatedSprite;
    private bardoPunch: AnimatedSprite;
    private bardoRunPunch: AnimatedSprite;
    private bardoBow: AnimatedSprite;
    private bardoJumpBow: AnimatedSprite;
    private bardoHurted: AnimatedSprite;
    public healthOnScreen: Text;
    public currentHealth: number = 100;
    public maxHealth: number = 100;
    private bardoGetUp: AnimatedSprite;
    
    


    constructor() {
        super();

        //BARDO RUN
        this.bardoWalk = new AnimatedSprite(
            [
                Texture.from("adventurer-run2-00.png"),
                Texture.from("adventurer-run2-01.png"),
                Texture.from("adventurer-run2-02.png"),
                Texture.from("adventurer-run2-03.png"),
                Texture.from("adventurer-run2-04.png"),
                Texture.from("adventurer-run2-05.png"),
            ],
            false
        );
        this.bardoWalk.scale.set(2);
        this.bardoWalk.animationSpeed = 0.15;
        this.bardoWalk.anchor.set(0.55, 0.95);
        this.bardoWalk.play();
        this.bardoWalk.visible = false;

        //BARDO HURTED
        this.bardoHurted = new AnimatedSprite(
            [
                Texture.from("adventurer-knock-dwn-00"),
                Texture.from("adventurer-knock-dwn-01"),
                Texture.from("adventurer-knock-dwn-02"),
                Texture.from("adventurer-knock-dwn-03"),
                Texture.from("adventurer-knock-dwn-04"),
                Texture.from("adventurer-knock-dwn-05"),
                Texture.from("adventurer-knock-dwn-06"),
            ],
            false
        );
        this.bardoHurted.scale.set(2);
        this.bardoHurted.animationSpeed = 0.05;
        this.bardoHurted.anchor.set(0.55, 0.95);
        this.bardoHurted.play();
        this.bardoHurted.visible = false;

        //BARDO GET UP
        this.bardoGetUp = new AnimatedSprite([
            Texture.from("adventurer-get-up-00.png"),
            Texture.from("adventurer-get-up-01.png"),
            Texture.from("adventurer-get-up-02.png"),
            Texture.from("adventurer-get-up-03.png"),
            Texture.from("adventurer-get-up-04.png"),
            Texture.from("adventurer-get-up-05.png"),
            Texture.from("adventurer-get-up-06.png"),
        ],
            false
        );
        this.bardoGetUp.scale.set(2);
        this.bardoGetUp.animationSpeed = 0.15;
        this.bardoGetUp.anchor.set(0.55, 0.95);
        this.bardoGetUp.play();
        this.bardoGetUp.visible = false;


        // BARDO PUNCH
        this.bardoPunch = new AnimatedSprite(
            [
                Texture.from("adventurer-punch-00.png"),
                Texture.from("adventurer-punch-01.png"),
                Texture.from("adventurer-punch-02.png"),
                Texture.from("adventurer-punch-03.png"),
                Texture.from("adventurer-punch-04.png"),
                Texture.from("adventurer-punch-05.png"),
            ],
            false
        );
        this.bardoPunch.scale.set(2);
        this.bardoPunch.animationSpeed = 0.15;
        this.bardoPunch.anchor.set(0.55, 0.95);
        this.bardoPunch.play();
        this.bardoPunch.visible = false;

        //BARDO RUNPUNCH
        this.bardoRunPunch = new AnimatedSprite(
            [
                Texture.from("adventurer-run-punch-00.png"),
                Texture.from("adventurer-run-punch-01.png"),
                Texture.from("adventurer-run-punch-02.png"),
                Texture.from("adventurer-run-punch-03.png"),
                Texture.from("adventurer-run-punch-04.png"),
                Texture.from("adventurer-run-punch-05.png"),
                Texture.from("adventurer-run-punch-06.png"),
            ],
            false
        );
        this.bardoRunPunch.scale.set(2);
        this.bardoRunPunch.animationSpeed = 0.15;
        this.bardoRunPunch.anchor.set(0.5, 0.95);
        this.bardoRunPunch.play();
        this.bardoRunPunch.visible = false;


        //BARDO AL PEDO 
        this.bardoIdle = new AnimatedSprite([
            Texture.from("adventurer-walk-00.png")
        ],
            false
        );
        this.bardoIdle.scale.set(2);
        this.bardoIdle.anchor.set(0.55, 0.95)
        this.bardoIdle.visible = true;
        this.bardoIdle.play();
        this.bardoIdle.animationSpeed = 0.15;

        //BARDO AGACHADITO
        this.bardoCrawl = new AnimatedSprite(
            [
                Texture.from("adventurer-crouch-walk-00.png"),
                Texture.from("adventurer-crouch-walk-01.png"),
                Texture.from("adventurer-crouch-walk-02.png"),
                Texture.from("adventurer-crouch-walk-03.png"),
                Texture.from("adventurer-crouch-walk-04.png"),
                Texture.from("adventurer-crouch-walk-05.png"),
            ],
            false
        );
        this.bardoCrawl.scale.set(2);
        this.bardoCrawl.animationSpeed = 0.15;
        this.bardoCrawl.anchor.set(0.45, 0.95);
        this.bardoCrawl.play();
        this.bardoCrawl.visible = false;

        //BARDO JUMP 
        this.bardoJump = new AnimatedSprite([
            Texture.from("adventurer-drop-kick-00.png"),
            Texture.from("adventurer-drop-kick-01.png"),
            Texture.from("adventurer-drop-kick-02.png"),
            Texture.from("adventurer-drop-kick-03.png"),
        ],
            false
        );
        this.bardoJump.scale.set(2);
        this.bardoJump.anchor.set(0.45, 0.95)
        this.bardoJump.play();
        this.bardoJump.animationSpeed = 0.05;
        this.bardoJump.loop = false;
        this.bardoJump.visible = false;

        // BARDO BOW
        this.bardoBow = new AnimatedSprite([
            Texture.from("adventurer-bow-00.png"),
            Texture.from("adventurer-bow-01.png"),
            Texture.from("adventurer-bow-02.png"),
            Texture.from("adventurer-bow-03.png"),
            Texture.from("adventurer-bow-04.png"),
            Texture.from("adventurer-bow-05.png"),
            Texture.from("adventurer-bow-06.png"),
            Texture.from("adventurer-bow-07.png"),
            Texture.from("adventurer-bow-08.png"),
        ],
            false
        );
        this.bardoBow.scale.set(2);
        this.bardoBow.anchor.set(0.45, 0.95)
        this.bardoBow.play();
        this.bardoBow.animationSpeed = 0.15;
        this.bardoBow.visible = false;

        // BARDO BOW
        this.bardoJumpBow = new AnimatedSprite([
            Texture.from("adventurer-bow-jump-00.png"),
            Texture.from("adventurer-bow-jump-01.png"),
            Texture.from("adventurer-bow-jump-02.png"),
            Texture.from("adventurer-bow-jump-03.png"),
            Texture.from("adventurer-bow-jump-04.png"),
            Texture.from("adventurer-bow-jump-05.png"),
        ],
            false
        );
        this.bardoJumpBow.scale.set(2);
        this.bardoJumpBow.anchor.set(0.45, 0.95)
        this.bardoJumpBow.play();
        this.bardoJumpBow.animationSpeed = 0.15;
        this.bardoJumpBow.visible = false;


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

        Keyboard.up.on("KeyW", this.stopJump, this);
        Keyboard.up.on("KeyS", this.stopCrawl, this);
        Keyboard.up.on("KeyD", this.stopRunRight, this);
        Keyboard.up.on("KeyA", this.stopRunLeft, this);
        Keyboard.up.on("KeyJ", this.stopPunch, this);
        Keyboard.up.on("KeyL", this.stopBow, this);
        Keyboard.up.on("KeyK", this.stopJumpBow, this);

        // this.addChild(auxZero);
        this.addChild(this.hitbox);

        // agrego todos los movimientos a la clase player
        this.addChild(
            this.bardoWalk,
            this.bardoHurted,
            this.bardoIdle,
            this.bardoJump,
            this.bardoCrawl,
            this.bardoPunch,
            this.bardoRunPunch,
            this.bardoBow,
            this.bardoJumpBow,
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

        Keyboard.down.off("KeyW", this.jump);
    }

    //  MOVIMIENTOS
    public override update(deltaMS: number) {
        super.update(deltaMS / 1000);
        // lo que es lo mismo que deltaseconds/(1/60)
        this.bardoJump.update(deltaMS / (1000 / 60)); // esto es para saber cuantos frames pasaron (que deberían ser 1)
        this.bardoIdle.update(deltaMS / (1000 / 60));
        this.bardoWalk.update(deltaMS / (1000 / 60));
        this.bardoCrawl.update(deltaMS / (1000 / 60));
        this.bardoPunch.update(deltaMS / (1000 / 60));
        this.bardoRunPunch.update(deltaMS / (1000 / 60));
        this.bardoBow.update(deltaMS / (1000 / 60));
        this.bardoJumpBow.update(deltaMS / (1000 / 60));
    }


    //  FUNCION AUXILIAR (SI NO LA TENGO SEPARADA NO PUEDO BORRARLA CUANDO ELIMINE A PLAYER)
    public jump() {
        if (this.canJump) {
            console.log("apreté la W!", this);
            this.speed.y = -(Player.GRAVITY * 0.7)
            this.canJump = false;
            this.bardoJump.visible = true;
            this.bardoIdle.visible = false;
            this.bardoWalk.visible = false;
            this.bardoCrawl.visible = false;
            this.bardoPunch.visible = false;
            this.bardoRunPunch.visible = false;
            this.bardoBow.visible = false;
            this.bardoJumpBow.visible = false;
            this.bardoJump.gotoAndPlay(0);
        }
    }

    public crawl() {
        console.log("apreté la S!", this);

        this.bardoCrawl.visible = true;
        this.bardoJump.visible = false;
        this.bardoIdle.visible = false;
        this.bardoWalk.visible = false;
        this.bardoPunch.visible = false;
        this.bardoRunPunch.visible = false;
        this.bardoBow.visible = false;
        this.bardoJumpBow.visible = false;
        this.removeChild(this.hitbox);
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0);
        this.hitbox.drawRect(-20, -40, 50, 40);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    public runLeft() {
        console.log("apreté la A!", this);
        this.speed.x = -Player.MOVE_SPEED;
        this.scale.set(-2, 2);
        this.bardoWalk.visible = true;
        this.bardoIdle.visible = false;
        this.bardoJump.visible = false;
        this.bardoCrawl.visible = false;
        this.bardoRunPunch.visible = false;
        this.bardoPunch.visible = false;
        this.bardoBow.visible = false;
        this.bardoJumpBow.visible = false;
    }

    public runRight() {
        console.log("apreté la D!", this);
        this.speed.x = Player.MOVE_SPEED;
        this.scale.set(2, 2);
        this.bardoWalk.visible = true;
        this.bardoIdle.visible = false;
        this.bardoJump.visible = false;
        this.bardoCrawl.visible = false;
        this.bardoRunPunch.visible = false;
        this.bardoPunch.visible = false;
        this.bardoBow.visible = false;
        this.bardoJumpBow.visible = false;
    }

    public punch() {
        console.log("apreté la J!", this);
        this.speed.x = this.speed.x * 2;
        this.bardoJump.visible = false;
        this.bardoIdle.visible = false;
        this.bardoWalk.visible = false;
        this.bardoCrawl.visible = false;
        this.bardoPunch.gotoAndPlay(0);
        this.bardoPunch.visible = true;
        this.bardoRunPunch.visible = false
        this.bardoBow.visible = false;
        this.bardoJumpBow.visible = false;
    }

    public punchRun() {
        console.log("apreté la J!", this);
        this.speed.x = this.speed.x * 2;
        this.bardoJump.visible = false;
        this.bardoIdle.visible = false;
        this.bardoWalk.visible = false;
        this.bardoCrawl.visible = false;
        this.bardoPunch.visible = false;
        this.bardoRunPunch.visible = true;
        this.bardoRunPunch.gotoAndPlay(0);
        this.bardoBow.visible = false;
        this.bardoJumpBow.visible = false;
    }

    public idlePlayer() {
        console.log("ninguna tecla presionada", this);
        this.speed.x = 0;
        this.bardoJump.visible = false;
        this.bardoIdle.visible = true;
        this.bardoWalk.visible = false;
        this.bardoCrawl.visible = false;
        this.bardoPunch.visible = false;
        this.bardoRunPunch.visible = false;
    }

    public fall(){
        this.bardoHurted.visible = true;
        this.bardoIdle.visible = false;
        this.bardoWalk.visible = false;
        this.bardoJump.visible = false;
        this.bardoCrawl.visible = false;
        this.bardoPunch.visible = false;
        this.bardoRunPunch.visible = false;
    }

    public bow(){
        this.bardoBow.visible = true;
        this.bardoIdle.visible = false;
        this.bardoWalk.visible = false;
        this.bardoJump.visible = false;
        this.bardoCrawl.visible = false;
        this.bardoPunch.visible = false;
        this.bardoRunPunch.visible = false;
        this.bardoBow.gotoAndPlay(0);
        this.bardoJumpBow.visible = false;
    }

    public jumpBow(){  
        this.bardoJumpBow.visible = true;
        this.bardoIdle.visible = false;
        this.bardoWalk.visible = false;
        this.bardoJump.visible = false;
        this.bardoCrawl.visible = false;
        this.bardoPunch.visible = false;
        this.bardoRunPunch.visible = false;
        this.bardoBow.visible = false;
        this.bardoJumpBow.gotoAndPlay(0);
    }

    private stopJump() {
        console.log("solté la W!", this);

        this.bardoCrawl.visible = false;
        this.bardoJump.visible = false;
        this.bardoIdle.visible = true;
        this.bardoWalk.visible = false;
        this.bardoPunch.visible = false;
        this.bardoRunPunch.visible = false;
    }

    private stopCrawl() {
        console.log("solté la S!", this);
        this.speed.x = 0;
        this.bardoCrawl.visible = false;
        this.bardoJump.visible = false;
        this.bardoIdle.visible = true;
        this.bardoWalk.visible = false;
        this.bardoPunch.visible = false;
        this.bardoRunPunch.visible = false;
        this.removeChild(this.hitbox);
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0);
        this.hitbox.drawRect(-20, -56, 40, 56);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    private stopRunLeft() {
        console.log("solté la A!", this);
        this.speed.x = 0;
        this.scale.set(-2, 2);
        this.bardoWalk.visible = false;
        this.bardoIdle.visible = true;
        this.bardoJump.visible = false;
        this.bardoPunch.visible = false;
        this.bardoRunPunch.visible = false;
    }

    private stopRunRight() {
        console.log("solté la D!", this);
        this.speed.x = 0;
        this.scale.set(2, 2);
        this.bardoWalk.visible = false;
        this.bardoIdle.visible = true;
        this.bardoJump.visible = false;
        this.bardoPunch.visible = false;
        this.bardoRunPunch.visible = false;
    }

    private stopPunch() {
        console.log("solté la J!", this);
        this.speed.x = this.speed.x / 2;
        this.bardoJump.visible = false;
        this.bardoIdle.visible = true;
        this.bardoWalk.visible = false;
        this.bardoCrawl.visible = false;
        this.bardoPunch.visible = false;
        this.bardoRunPunch.visible = false;
    }

    private stopBow(){
        this.bardoBow.visible = false;
        this.bardoIdle.visible = true;
        this.bardoWalk.visible = false;
        this.bardoJump.visible = false;
        this.bardoCrawl.visible = false;
        this.bardoPunch.visible = false;
        this.bardoRunPunch.visible = false;
    }

    private stopJumpBow(){
        this.bardoJumpBow.visible = false;
        this.bardoIdle.visible = true;
        this.bardoWalk.visible = false;
        this.bardoJump.visible = false;
        this.bardoCrawl.visible = false;
        this.bardoPunch.visible = false;
        this.bardoRunPunch.visible = false;
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
        console.log("Enemy health: " + this.currentHealth);
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
