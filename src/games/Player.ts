import {
    Graphics,
    IDestroyOptions,
    ObservablePoint,
    Rectangle,
    Text,
} from "pixi.js";
import { Easing, Tween } from "tweedle.js";
import { Keyboard } from "../utils/Keyboard";
import { IHitBox } from "./IHitBox";
import { PhysicsContainer } from "./PhysicsContainer";
import { INITIAL_ARROWS, LETRA1, LETRA1SUBTITLE, setValue } from "../utils/constants";
import { LevelPoints } from "../Logic/LevelPoints";
import { playSFX, stopAllSFX, stopSFX, stopSounds } from "../utils/SoundParams";
import { Timer } from "../utils/SceneManager";
import { PlayerAnimations } from "./PlayerAnimations";

export class Player extends PhysicsContainer implements IHitBox {
    private static readonly GRAVITY = 1000;
    private static readonly MOVE_SPEED = 350;
    private jumpBowCooldown: number = 390; // Tiempo de animación del arco en milisegundos
    private bowCooldown: number = 480; // Tiempo de animación del arco en milisegundos

    public healthOnScreen: Text;
    private hitbox: Graphics;
    public arrowsAvailable: number;

    public hurted: boolean = false;
    public recovered: boolean = false;
    public canJump = true;
    public canPunch: boolean = true;
    public canBow: boolean = true;

    public currentHealth: number = 100;
    public static level: number;
    public static _hp: number = 100;
    private static _baseMaxHealth: number = 100;
    public static _maxHealth: number = 100;
    public static _strength: number = 10;
    public static _speed: number = 5;
    public static _punchDamage: number = 1;
    public static _bowDamage: number = 5;
    public static height: number;
    public _swordDamage: number = 40;

    public levelPoints: LevelPoints;
    private static _instance: Player | null = null;
    public runningPostJump: boolean | undefined = false;

    public animations: PlayerAnimations;

    public static getInstance(): Player {
        if (!Player._instance) {
            Player._instance = new Player();
        }
        return Player._instance;
    }

    // Función para aumentar el nivel
    public increaseLevel(): void {
        // Acceder a las variables estáticas para actualizar los stats.
        Player._hp += 20;
        Player._strength += 5;
        Player._speed += 1;
        Player._punchDamage += 0.5;
        Player._bowDamage += 0.5;
        this._swordDamage += 20;

        const healthIncreasePerLevel = 20;
        Player._baseMaxHealth += healthIncreasePerLevel; // Incrementar la salud máxima en un valor base cada vez que se sube de nivel
        Player._maxHealth = Player._baseMaxHealth; // Actualizar la salud máxima con el nuevo valor base
    }

    constructor() {
        super();

        this.levelPoints = new LevelPoints(this);
        this.arrowsAvailable = INITIAL_ARROWS;

        this.animations = new PlayerAnimations();

        this.animations.idle();

        // PUNTO GUÍA
        const auxZero = new Graphics();
        auxZero.beginFill(0xff00ff);
        auxZero.drawCircle(0, 0, 5);
        auxZero.endFill();

        // CAJAS
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xff00ff, 0);
        this.hitbox.drawRect(-10, -56, 33, 56);
        this.hitbox.endFill();

        this.acceleration.y = Player.GRAVITY;

        this.initKeyboardEvents(true);
        this.addChild(this.hitbox, this.animations);

        if (Player._hp) {
            this.healthOnScreen = new Text(`${Player._hp}` + "HP", LETRA1SUBTITLE);
        } else if (Player._hp == undefined) {
            let initialHealth: number = 100;
            Player._hp = initialHealth;
            Player._maxHealth = Player._baseMaxHealth;
        }
        this.healthOnScreen = new Text(`${Player._hp}` + "HP", LETRA1);

        // this.addChild(this.healthOnScreen);
        this.healthOnScreen.x = -60;
        this.healthOnScreen.y = -130;
    }

    public initKeyboardEvents(state: boolean): void {
        if (state) {
            // Asignación de eventos de teclado
            Keyboard.down.on("KeyW", this.jump, this);
            Keyboard.down.on("KeyS", this.crawl, this);
            Keyboard.down.on("KeyD", this.runRight, this);
            Keyboard.down.on("KeyA", this.runLeft, this);
            Keyboard.down.on("KeyJ", this.punch, this);
            Keyboard.down.on("KeyL", this.bow, this);
            Keyboard.up.on("KeyS", this.stopCrawl, this);
            Keyboard.up.on("KeyD", this.stopRunRight, this);
            Keyboard.up.on("KeyA", this.stopRunLeft, this);
        } else {
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
        }
    }

    public increasePoints(amount: number): void {
        this.levelPoints.increasePoints(amount);
        Player.level = this.levelPoints.getCurrentLevel();
    }

    public static getLevel(): number {
        if (Player.level != undefined) {
            return Player.level;
        } else {
            return 1;
        }
    }

    // ESTO ES PARA QUE CUANDO DESTRUYA EL PLAYER TAMBIÉN SE BORRE EL MÉTODO DE SALTAR KEYBOARD DOWN ARROW UP ----> THIS.JUMP
    public override destroy(
        options: boolean | IDestroyOptions | undefined
    ): void {
        super.destroy(options);
        this.initKeyboardEvents(false);
    }

    //  MOVIMIENTOS
    public override update(deltaMS: number): void {
        super.update(deltaMS / 1000);
        this.animations.update(deltaMS / (1000 / 60));
    }

    /** Función para el salto (Función auxiliar, si no está separada no puedo borrarla cuando elimine a player) */
    public jump(): void {
        if (this.canJump) {
            stopSFX("running");
            playSFX("jumper", { loop: false, volume: 0.05 });
            this.speed.y = -(Player.GRAVITY * 0.7);
            this.animations.jump();
            new Tween(this.animations)
                .to({}, 1450)
                .start()
                .onComplete(() => {
                    this.canJump = true;
                    if (
                        Keyboard.state.get("KeyD") ||
                        Keyboard.state.get("KeyA") ||
                        this.runningPostJump
                    ) {
                        stopSFX("running");
                        this.animations.run();
                        playSFX("running", { loop: true, volume: 0.05 });
                    } else {
                        this.animations.idle();
                        stopSounds(["running"]);
                    }
                });
            this.canJump = false;
        }
    }

    /** Caminar agachado */
    public crawl(): void {
        this.animations.crawl();
        this.removeChild(this.hitbox);
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xff00ff, 0);
        this.hitbox.drawRect(-20, -40, 50, 40);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    public runLeft(): void {
        stopSFX("running");
        playSFX("running", { loop: true, volume: 0.05 });
        this.speed.x = -Player.MOVE_SPEED;
        this.scale.set(-2, 2);
        this.animations.run();
    }

    public runRight(): void {
        stopSFX("running");
        playSFX("running", { loop: true, volume: 0.05 });
        this.speed.x = Player.MOVE_SPEED;
        this.scale.set(2, 2);
        this.animations.run();
    }

    public punch(): void {
        stopSounds(["running"]);
        if (this.canPunch) {
            this.speed.x = this.speed.x * 2;
            this.animations.punch();
            this.canPunch = false;
            const punchDuration = 550;
            new Tween(this.animations)
                .to({}, punchDuration)
                .start()
                .onComplete(() => {
                    this.stopPunch();
                    this.canPunch = true;
                });
        }
    }

    public punchRun(): void {
        stopSounds(["running"]);
        playSFX("bow", { loop: false, volume: 0.05 });
        this.speed.x = this.speed.x * 2;
        this.animations.runPunch();
    }

    public idlePlayer(): void {
        stopAllSFX();
        stopSounds(["running"]);
        this.speed.x = 0;
        this.runningPostJump = false;
        this.animations.idle();
    }

    public fall(): void {
        this.animations.hurted();
        this.hurted = true;
        this.recovered = false;
    }

    public getUp(): void {
        if (this.hurted) {
            new Tween(this)
                .to({ alpha: 1 }, 500)
                .repeat(2)
                .easing(Easing.Elastic.Out)
                .start()
                .onComplete(() => {
                    this.animations.getUp();
                    this.hurted = false;
                });
        }
    }

    public bow(): void {
        if (this.canJump && this.canBow) {
            this.animations.bow();
            this.canBow = false;
            new Tween(this.animations)
                .to({}, this.bowCooldown)
                .start()
                .onComplete(() => {
                    this.emit("shoot");
                    playSFX("bow", { loop: false, volume: 0.05 });
                    this.resetBowCooldown();
                });
        }
        // Arco y flecha mientras estoy saltando
        if (!this.canJump && this.canBow) {
            this.animations.jumpBow();
            this.canBow = false;
            new Tween(this.animations)
                .to({}, this.jumpBowCooldown)
                .start()
                .onComplete(() => {
                    this.emit("shoot");
                    playSFX("bow", { loop: false, volume: 0.05 });
                    this.resetJumpBowCooldown();
                });
        }
    }

    private resetBowCooldown(): void {
        Timer(this.bowCooldown, () => this.stopBow());
    }

    private resetJumpBowCooldown(): void {
        Timer(this.jumpBowCooldown, () => this.stopBow());
    }

    private stopJump(): void {
        this.animations.idle();
        stopSounds(["running"]);
    }

    private stopCrawl(): void {
        this.animations.idle();
        this.speed.x = 0;
        this.removeChild(this.hitbox);
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xff00ff, 0);
        this.hitbox.drawRect(-10, -56, 33, 56);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    private stopRunLeft(): void {
        stopSounds(["running"]);
        this.speed.x = 0;
        this.scale.set(-2, 2);
        this.animations.idle();
    }

    private stopRunRight(): void {
        stopSounds(["running"]);
        this.speed.x = 0;
        this.scale.set(2, 2);
        this.animations.idle();
        stopSFX("running");
    }

    public stopPunch(): void {
        this.speed.x = this.speed.x / 2;
        this.animations.idle();
    }

    public stopBow(): void {
        this.animations.idle();
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
            this.animations.playState("hurted", true);
            new Tween(this)
                .to({ x: 5, alpha: 0.5 }, 500)
                .start()
                .onComplete(() => { });
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
        this.animations.on("currentAnimation", (current) => {
            console.log(current);
            currentName = this.animations.currentState(current);
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

export function setPlayerHeight(height: number): void {
    setValue("height", height.toString());
    Player.height = height;
}
