import { AnimatedSprite, Graphics, IDestroyOptions, ObservablePoint, Rectangle, Texture } from "pixi.js";
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
        this.bardoWalk.anchor.set(0.55, 1.4);
        this.bardoWalk.play();
        this.bardoWalk.visible = false;
 
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
        this.bardoPunch.anchor.set(0.55, 1.4);
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
        this.bardoRunPunch.anchor.set(0.55, 1.4);
        this.bardoRunPunch.play();
        this.bardoRunPunch.visible = false;


        //BARDO AL PEDO 
        this.bardoIdle = new AnimatedSprite([
            Texture.from("adventurer-walk-00.png")
        ],
            false
        );
        this.bardoIdle.scale.set(2);
        this.bardoIdle.anchor.set(0.55, 1.4)
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
        this.bardoCrawl.anchor.set(0.45, 1.4);
        this.bardoCrawl.play();
       

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
        this.bardoJump.anchor.set(0.45, 1.3)
        this.bardoJump.visible = true;
        this.bardoJump.play();
        this.bardoJump.animationSpeed = 0.05;
        this.bardoJump.loop = false;

        // PUNTO GUÍA
        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0, -40, 10);
        auxZero.endFill();

        // CAJAS
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.5);
        this.hitbox.drawRect(-20, -80, 50, 50);
        this.hitbox.endFill();


        this.acceleration.y = Player.GRAVITY;
        Keyboard.down.on("KeyW", this.jump, this)
        


        // this.addChild(auxZero);
        // this.addChild(this.hitbox)

        // agrego todos los movimientos a la clase player
        this.addChild(
            this.bardoWalk,
            this.bardoIdle,
            this.bardoJump,
            this.bardoCrawl,
            this.bardoPunch,
            this.bardoRunPunch,
            )

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

        //  CAMINAR HACIA LA IZQUIERDA
        //arrastrarse
        if ((Keyboard.state.get("KeyS")) && ((Keyboard.state.get("KeyD")))) {
            this.speed.x = Player.MOVE_SPEED;
            this.scale.set(2, 2);
            this.bardoCrawl.visible = true;
            this.bardoJump.visible = false;
            this.bardoRunPunch.visible=false;
            this.bardoIdle.visible = false;
            this.bardoWalk.visible = false;
            this.bardoPunch.visible=false;
        }
        else if              //arrastrarse
                ((Keyboard.state.get("KeyS")) && (Keyboard.state.get("KeyA"))) {
                this.speed.x = -Player.MOVE_SPEED;
                this.scale.set(-2, 2);
                this.bardoCrawl.visible = true;
                this.bardoPunch.visible=false;
                this.bardoRunPunch.visible=false;
                this.bardoJump.visible = false;
                this.bardoIdle.visible = false;
                this.bardoWalk.visible = false;
        }else if (Keyboard.state.get("KeyS")){
           
            this.bardoCrawl.visible = true;
                this.bardoJump.visible = false;
                this.bardoIdle.visible = false;
                this.bardoRunPunch.visible=false;
                this.bardoWalk.visible = false;
                this.bardoPunch.visible=false;
        } else      
        if (Keyboard.state.get("KeyA")) {
            this.speed.x = -Player.MOVE_SPEED;
            this.scale.set(-2, 2);
            this.bardoWalk.visible = true;
            this.bardoIdle.visible = false;
            this.bardoJump.visible = false;
            this.bardoRunPunch.visible=false;
            this.bardoPunch.visible=false;
            this.bardoCrawl.visible = false;
        } else if
            //  CAMINAR HACIA LA DERECHA
            (Keyboard.state.get("KeyD")) {
            this.speed.x = Player.MOVE_SPEED;
            this.scale.set(2, 2);
            this.bardoWalk.visible = true;
            this.bardoIdle.visible = false;
            this.bardoRunPunch.visible=false;
            this.bardoPunch.visible=false;
            this.bardoJump.visible = false;
            this.bardoCrawl.visible = false;
        } 
         else/*  FRENAR  */ {
            this.speed.x = 0;
            this.bardoIdle.visible = true;
            this.bardoWalk.visible = false;
            this.bardoRunPunch.visible=false;
            this.bardoJump.visible = false;
            this.bardoPunch.visible=false;
            this.bardoCrawl.visible = false;
        }
        // SALTAR
        if (Keyboard.state.get("KeyW")) {
            this.jump;
            this.bardoJump.visible = true;
            this.bardoRunPunch.visible=false;
            this.bardoIdle.visible = false;
            this.bardoWalk.visible = false;
            this.bardoCrawl.visible = false;
            this.bardoPunch.visible=false;
        }

        // ATACAR
        if (((Keyboard.state.get("KeyD")) || (Keyboard.state.get("KeyA"))) && (Keyboard.state.get("KeyJ"))) {
            this.speed.x=this.speed.x*2;
            this.bardoJump.visible = false;
            this.bardoIdle.visible = false;
            this.bardoWalk.visible = false;
            this.bardoCrawl.visible = false;
            this.bardoPunch.visible=false;
            this.bardoRunPunch.visible=true;
            
        } else 
        
        // ATACAR
        if (Keyboard.state.get("KeyJ")) {
            this.bardoJump.visible = false;
            this.bardoIdle.visible = false;
            this.bardoWalk.visible = false;
            this.bardoCrawl.visible = false;
            this.bardoPunch.visible=true;
            this.speed.x=0;
            this.bardoRunPunch.visible=false;
        }
        //DEFENDER
        if (Keyboard.state.get("KeyK")) {

        }
    }


    //  FUNCION AUXILIAR (SI NO LA TENGO SEPARADA NO PUEDO BORRARLA CUANDO ELIMINE A PLAYER)
    private jump() {
        if (this.canJump) {
            this.speed.y = -(Player.GRAVITY * 0.7)
            this.canJump = false;
            this.bardoJump.visible = true;
            this.bardoIdle.visible = false;
            this.bardoWalk.visible = false;
            this.bardoJump.gotoAndPlay(0);
        }
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
            // POR ACA ESTA MI PROBLEMA, SIEMPRE ME APARECE QUE GOLPEO DESDE ABAJO
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

}
