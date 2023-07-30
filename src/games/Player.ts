import { sound } from "@pixi/sound";
import { Graphics, IDestroyOptions, ObservablePoint, Rectangle, Text } from "pixi.js";
import { Easing, Tween } from "tweedle.js";

import { Keyboard } from "../utils/Keyboard";
import { StateAnimation } from "../utils/StateAnimation";
import { IHitBox } from "./IHitBox";
import { PhysicsContainer } from "./PhysicsContainer";
import { INITIALARROWS } from "../utils/constants";
import { LevelPoints } from "../Logic/LevelPoints";

export class Player extends PhysicsContainer implements IHitBox {
    private static readonly GRAVITY = 1000;
    private static readonly MOVE_SPEED = 350;
    public canJump = true;
    private hitbox: Graphics;
    public healthOnScreen: Text;
    public currentHealth: number = 100;
    public maxHealth: number = 100;
    public canPunch: boolean = true;
    public punchDamage: number = 2;
    public bardo: StateAnimation;
    public canBow: boolean = true;
    public arrowsAvailable: number;
    public hurted: boolean = false;
    public recovered: boolean = false;
    public levelPoints: LevelPoints;
    public static level: number;

    public static _hp: number = 100;
    private static _baseMaxHealth: number = 100;
    public static _maxHealth: number = 100;
    public static _strength: number = 10;
    public static _speed: number = 5;
    public static _punchDamage: number = 2;
    public static _bowDamage: number = 5;
    public _swordDamage: number = 40;

    private static _instance: Player | null = null;

    public static getInstance(): Player {
        if (!Player._instance) {
            Player._instance = new Player();
        }
        return Player._instance;
    }

    // Getters y otros métodos...

    // Función para aumentar el nivel
    public increaseLevel(): void {
        // Acceder a las variables estáticas para actualizar los stats.
        Player._hp += 20;
        Player._strength += 5;
        Player._speed += 1;
        Player._punchDamage += 0.5;
        Player._bowDamage += 0.5;
        this._swordDamage += 20;

        // Incrementar la salud máxima en un valor base cada vez que se sube de nivel
        const healthIncreasePerLevel = 20;
        Player._baseMaxHealth += healthIncreasePerLevel;

        // Actualizar la salud máxima con el nuevo valor base
        Player._maxHealth = Player._baseMaxHealth;
    }

    constructor() {
        super();

        this.bardo = new StateAnimation();
        this.bardo.scale.set(2)
        this.bardo.pivot.set(0.55, 17);

        this.levelPoints = new LevelPoints(this); // Inicializa con 0 puntos y un multiplicador de 1.5
        console.log('this.levelPoints', this.levelPoints)

        this.arrowsAvailable = INITIALARROWS;

        this.bardo.addState("run",
            [
                "adventurer-run2-00.png",
                "adventurer-run2-01.png",
                "adventurer-run2-02.png",
                "adventurer-run2-03.png",
                "adventurer-run2-04.png",
                "adventurer-run2-05.png",
            ],
            0.1,
            true
        )

        this.bardo.addState("hurted",
            [
                "adventurer-knock-dwn-00.png",
                "adventurer-knock-dwn-01.png",
                "adventurer-knock-dwn-02.png",
                "adventurer-knock-dwn-03.png",
                "adventurer-knock-dwn-04.png",
                "adventurer-knock-dwn-05.png",
                "adventurer-knock-dwn-06.png",
            ],
            0.1,
            false
        )

        this.bardo.addState("getUp",
            [
                "adventurer-get-up-00.png",
                "adventurer-get-up-01.png",
                "adventurer-get-up-02.png",
                "adventurer-get-up-03.png",
                "adventurer-get-up-04.png",
                "adventurer-get-up-05.png",
                "adventurer-get-up-06.png",
            ],
            0.1,
            false
        )

        this.bardo.addState("punch",
            [
                "adventurer-punch-00.png",
                "adventurer-punch-01.png",
                "adventurer-punch-02.png",
                "adventurer-punch-03.png",
                "adventurer-punch-04.png",
                "adventurer-punch-05.png",
            ],
            0.1,
            true
        )

        this.bardo.addState("runPunch",
            [
                "adventurer-run-punch-00.png",
                "adventurer-run-punch-01.png",
                "adventurer-run-punch-02.png",
                "adventurer-run-punch-03.png",
                "adventurer-run-punch-04.png",
                "adventurer-run-punch-05.png",
                "adventurer-run-punch-06.png",
            ],
            0.1,
            true
        )

        this.bardo.addState("idle",
            ["adventurer-walk-00.png"],
            0.05, true)

        this.bardo.addState("crawl",
            [
                "adventurer-crouch-walk-00.png",
                "adventurer-crouch-walk-01.png",
                "adventurer-crouch-walk-02.png",
                "adventurer-crouch-walk-03.png",
                "adventurer-crouch-walk-04.png",
                "adventurer-crouch-walk-05.png",
            ],
            0.1,
            true
        )

        this.bardo.addState("jump",
            [
                "adventurer-drop-kick-00.png",
                "adventurer-drop-kick-01.png",
                "adventurer-drop-kick-02.png",
                "adventurer-drop-kick-03.png",
            ],
            0.025,
            false
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

            ],
            0.1,
            true
        )

        this.bardo.addState("chargebow",
            ["adventurer-bow-00.png",
                "adventurer-bow-01.png",
                "adventurer-bow-02.png",
                "adventurer-bow-03.png",
                "adventurer-bow-04.png",
                "adventurer-bow-05.png",
            ],
            0.1,
            true
        )

        this.bardo.addState("chargedbow",
            [
                "adventurer-bow-04.png",
                "adventurer-bow-05.png",
            ],
            0.1,
            true
        )

        this.bardo.addState("shootingbow",
            [
                "adventurer-bow-06.png",
                "adventurer-bow-07.png",
                "adventurer-bow-08.png",
            ], 0.1, true)

        this.bardo.addState("jumpBow",
            [
                "adventurer-bow-jump-00.png",
                "adventurer-bow-jump-01.png",
                "adventurer-bow-jump-02.png",
                "adventurer-bow-jump-03.png",
                "adventurer-bow-jump-04.png",
                "adventurer-bow-jump-05.png",
            ],
            0.1,
            true
        )

        this.bardo.playState("idle");

        // PUNTO GUÍA
        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0, 0, 5);
        auxZero.endFill();

        // CAJAS
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0);
        this.hitbox.drawRect(-10, -56, 33, 56);
        this.hitbox.endFill();

        this.acceleration.y = Player.GRAVITY;

        // MOVIMIENTOS
        Keyboard.down.on("KeyW", this.jump, this);
        Keyboard.down.on("KeyS", this.crawl, this);
        Keyboard.down.on("KeyD", this.runRight, this);
        Keyboard.down.on("KeyA", this.runLeft, this);
        Keyboard.down.on("KeyJ", this.punch, this);
        Keyboard.down.on("KeyL", this.bow, this);

        Keyboard.up.on("KeyS", this.stopCrawl, this);
        Keyboard.up.on("KeyD", this.stopRunRight, this);
        Keyboard.up.on("KeyA", this.stopRunLeft, this);
        Keyboard.up.on("KeyL", this.stopBow, this);

        // this.addChild(auxZero);
        this.addChild(this.hitbox);

        // agrego todos los movimientos a la clase player
        this.addChild(this.bardo);

        if (Player._hp) {
            this.healthOnScreen = new Text(`${Player._hp}` + "HP", { fontSize: 40, fontFamily: "Letra1" });
        } else if (Player._hp == undefined) {
            // Cambiamos todas las referencias a currentHealth por _hp
            let initialHealth: number = 100;
            Player._hp = initialHealth;
            Player._maxHealth = Player._baseMaxHealth;
        }
        this.healthOnScreen = new Text(`${Player._hp}` + "HP", { fontSize: 40, fontFamily: "Letra1" });

        // this.addChild(this.healthOnScreen);
        this.healthOnScreen.x = -60;
        this.healthOnScreen.y = -130;
    }

    increasePoints(amount: number): void {
        this.levelPoints.increasePoints(amount);
        Player.level = this.levelPoints.getCurrentLevel();
    }

    public static getLevel(): number {
        if (Player.level != undefined) {
            return Player.level;
        } else {
            return 1
        }
    }

    // ESTO ES PARA QUE CUANDO DESTRUYA EL PLAYER TAMBIÉN SE BORRE EL MÉTODO DE SALTAR KEYBOARD DOWN ARROW UP ----> THIS.JUMP
    public override destroy(options: boolean | IDestroyOptions | undefined): void {
        super.destroy(options);

        Keyboard.down.off("KeyW", this.jump, this);
        Keyboard.down.off("KeyS", this.crawl, this);
        Keyboard.down.off("KeyD", this.runRight, this);
        Keyboard.down.off("KeyA", this.runLeft, this);
        Keyboard.down.off("KeyJ", this.punch, this);
        Keyboard.down.off("KeyL", this.bow, this);

        Keyboard.up.off("KeyW", this.stopJump, this);
        Keyboard.up.off("KeyS", this.stopCrawl, this);
        Keyboard.up.off("KeyD", this.stopRunRight, this);
        Keyboard.up.off("KeyA", this.stopRunLeft, this);
        Keyboard.up.off("KeyJ", this.stopPunch, this);
        Keyboard.up.off("KeyL", this.stopBow, this);
    }


    //  MOVIMIENTOS
    public override update(deltaMS: number): void {
        super.update(deltaMS / 1000);
        this.bardo.update(deltaMS / (1000 / 60));
    }


    /** Función para el salto (Función auxiliar, si no está separada no puedo borrarla cuando elimine a player) */
    public jump(): void {
        if (this.canJump) {
            this.speed.y = -(Player.GRAVITY * 0.7)
            this.canJump = false;
            this.bardo.playState("jump", true);
        }
        sound.stop("running");
    }

    /** Caminar agachado */
    public crawl(): void {
        this.bardo.playState("crawl", true)
        this.removeChild(this.hitbox);
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0);
        this.hitbox.drawRect(-20, -40, 50, 40);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    /** Correr a la izquierda */
    public runLeft(): void {
        const run = sound.find("running");
        run.play({ loop: true, volume: 0.05 })
        this.speed.x = -Player.MOVE_SPEED;
        this.scale.set(-2, 2);
        this.bardo.playState("run");
    }

    /** Correr a la derecha */
    public runRight(): void {
        const run = sound.find("running");
        run.play({ loop: true, volume: 0.05 })
        this.speed.x = Player.MOVE_SPEED;
        this.scale.set(2, 2);
        this.bardo.playState("run", true)
    }

    /** Golpe de puño */
    public punch(): void {
        if (this.canPunch) {
            this.speed.x = this.speed.x * 2;
            this.bardo.playState("punch");
            this.canPunch = false;
            this.punchDamage = 2;
            new Tween(this.bardo).to({}, 550).start().onComplete(() => {
                this.canPunch = true;
                this.stopPunch();
            });
            this.canPunch = false;
            this.punchDamage = 2;
        }
    }

    /** Golpe corriendo */
    public punchRun(): void {
        const atkbow = sound.find("bow");
        atkbow.play({ loop: true, volume: 0.05 })
        this.speed.x = this.speed.x * 2;
        this.bardo.playState("runPunch", true)
    }

    /** Jugador ocioso */
    public idlePlayer(): void {
        this.speed.x = 0;
        this.bardo.playState("idle", true)
    }

    /** Jugador dañado */
    public fall(): void {
        this.bardo.playState("hurted");
        this.hurted = true;
        this.recovered = false;
    }

    /** Jugador levantandose */
    public getUp(): void {
        if (this.hurted) {
            new Tween(this).to({ alpha: 1 }, 500).repeat(2).easing(Easing.Elastic.Out).start().onComplete(() => {
                this.bardo.playState("getUp");
                this.hurted = false;
            });
        }
    }

    /** Función de arco en suelo y salto */
    public bow(): void {
        // Arco y flecha mientras estoy en el piso
        if (this.canJump && this.canBow) {
            this.bardo.playState("bow");
            this.canBow = false;
            new Tween(this.bardo).to({}, 750).start().onComplete(() => {
                this.emit("shoot");
                const atkbow = sound.find("bow");
                atkbow.play({ loop: false, volume: 0.05 })
                this.stopBow();
            });
        }
        // Arco y flecha mientras estoy saltando
        if (!this.canJump && this.canBow) {
            this.bardo.playState("jumpBow");
            this.canBow = false;
            new Tween(this.bardo).to({}, 490).start().onComplete(() => {
                this.emit("shoot");
                const atkbow = sound.find("bow");
                atkbow.play({ loop: false, volume: 0.05 })
                this.stopBow();
            });
        }
    }

    private stopJump(): void {
        this.bardo.playState("idle", true)
    }

    private stopCrawl(): void {
        this.bardo.playState("idle", true)
        this.speed.x = 0;
        this.removeChild(this.hitbox);
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0);
        this.hitbox.drawRect(-10, -56, 33, 56);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    private stopRunLeft(): void {
        sound.stop("running");
        this.speed.x = 0;
        this.scale.set(-2, 2);
        this.bardo.playState("idle", true)
    }

    private stopRunRight(): void {
        sound.stop("running");
        this.speed.x = 0;
        this.scale.set(2, 2);
        this.bardo.playState("idle", true)
    }

    public stopPunch(): void {
        this.speed.x = this.speed.x / 2;
        this.bardo.playState("idle", true)
    }

    public stopBow(): void {
        this.bardo.playState("idle", true);
        this.canBow = true;
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
        } else {
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
    // Función de daño al jugador
    public getPlayerHurt(damage: number): void {
        Player._hp -= damage;
        if (Player._hp < 0) {
            Player._hp = 0;
        }
        this.healthOnScreen.text = `${Player._hp}` + "HP";
        console.log("Player health: " + Player._hp);

        if (Player._hp <= 0) {
            Player._hp = 0;
            this.bardo.playState("hurted", true);
            new Tween(this).to({ x: 5, alpha: 0.5 }, 500).start().onComplete(() => {
            });
        }
    }

    // Curación al tomar una poción
    public drinkPotion(healthRecovered: number): void {
        Player._hp += healthRecovered;
        if (Player._hp > Player._maxHealth) {
            Player._hp = Player._maxHealth;
        }
        this.healthOnScreen.text = `${Player._hp}` + "HP";
        console.log("Player health: " + Player._hp);
    }

    public checkWhatsHeDoing(): string | any {
        let currentName: string;
        this.bardo.on("currentAnimation", (current) => {
            console.log(current);
            currentName = this.bardo.currentState(current);
            if (currentName != undefined) {
                console.log(currentName);
                return currentName;
            } else {
                console.log("no idea what's he doin");
                return "no idea what's he doin";
            }
        });
    }
}
