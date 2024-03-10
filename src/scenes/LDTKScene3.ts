import {
    Container,
    DisplayObject,
    Sprite,
    Text,
    Texture,
} from "pixi.js";
import { Tween } from "tweedle.js";
import { Arek } from "../games/Enemies/Arek";
import { HealthBar } from "../games/HealthBar";
import { checkCollision } from "../games/IHitBox";
import { Platform } from "../games/Platform";
import { Player } from "../games/Player";
import { Potion } from "../games/Potion";
import { Melee } from "../games/Weapon/Melee";
import { Range } from "../games/Weapon/Range";
import { GenericPanel } from "../ui/GenericPanel";
import { PointButton } from "../ui/PointButton";
import { ToggleButton } from "../ui/ToggleButton";
import { IUpdateable } from "../utils/IUpdateable";
import { Keyboard } from "../utils/Keyboard";
import { SceneManager } from "../utils/SceneManager";
import { PauseScene } from "./PauseScene";
import { WinScene } from "./WinScene";
import { GameOverScene } from "./GameOverScene";
import { SceneBase } from "../utils/SceneBase";
import { Arrow } from "../games/Weapon/Arrow";
import {
    buttonA,
    buttonB,
    buttonsOff,
    buttonsOn,
    moveDown,
    moveLeft,
    moveRight,
    moveUp,
    pauseOff,
    pauseOn,
    start,
} from "../utils/ButtonParams";
import { LevelPoints } from "../Logic/LevelPoints";
import { LETRA1, LETRA4, PLAYER_SCALE, TEXT_TIME_LETTER_BY_LETTER } from "../utils/constants";
import { PopUpsNames, closePopUp, createPopUp } from "../utils/PopUps";
import { playSound, stopAllSFX, stopSounds } from "../utils/SoundParams";
import { Level } from "../utils/Level";
import { isMobileDevice } from "..";
import { createPointButton } from "../utils/FunctionManager";
import { DialogBox } from "../utils/DialogBox";

export class LDTKScene3 extends SceneBase implements IUpdateable {
    private world: Container;
    private player: Player;
    private levelSprite: Sprite;
    private platforms: Platform[] = [];
    public potions: Potion[] = [];
    public gameOver: boolean = false;
    private isPaused: boolean = false;

    private arek: Arek;
    private melee: Melee;
    private melee2: Melee;
    private range: Range;
    public arekDamage: number = 1;

    private HPbar: HealthBar;
    private HPbar2: HealthBar;
    private chest: Potion;

    public winStage: boolean = false;
    public nextStage: boolean = false;
    private arrows: Arrow[] = [];
    public arrowDamage: number = 20;
    public arrowsOnScreen: Text;
    private aljava: Sprite;
    public myLevel: Text;
    private popUps: {
        [name: string]: {
            objectsToRemove: DisplayObject[][];
            objectsToAdd: DisplayObject[][];
            background: Sprite;
        };
    } = {};
    private gotToChest: boolean = false;
    private dialogBox: DialogBox = new DialogBox(SceneManager.WIDTH / 2, SceneManager.HEIGHT - 150, SceneManager.WIDTH, 300);
    public isEKeyPressed: boolean = false;
    private cartel: GenericPanel;
    private start: PointButton;
    private buttonA: PointButton;
    private buttonB: PointButton;
    private moveUp: PointButton;
    private moveDown: PointButton;
    private moveLeft: PointButton;
    private moveRight: PointButton;
    private buttonSound: ToggleButton;
    private pauseOn: PointButton;
    private pauseOff: PointButton;
    private buttonsOn: PointButton;
    private buttonsOff: PointButton;
    private barra: GenericPanel;
    public pauseScene!: PauseScene;
    public causingRangeDamage: boolean = false;

    constructor() {
        super();

        this.world = new Container();
        this.addChild(this.world);

        this.levelSprite = Sprite.from("Level_2");
        const screenRelation = SceneManager.HEIGHT / this.levelSprite.height;
        this.levelSprite.scale.set(screenRelation);
        this.world.addChild(this.levelSprite);

        this.player = new Player();
        this.player.scale.set(PLAYER_SCALE);
        this.player.position.set(600, 500);
        this.world.addChild(this.player);

        Level.CurrentLevel = 3;
        console.log("Current Level: ", Player.getLevel());
        console.log(
            "this.playerBardo.levelPoints.requiredPoints",
            LevelPoints.requiredPoints
        );
        console.log("this.playerBardo.levelPoints.points", LevelPoints.points);

        this.player.on("shoot", () => {
            this.shootArrow();
        });

        this.arek = new Arek();
        this.arek.scale.set(2);
        this.arek.position.y = 650;
        this.arek.position.x = 3700;
        this.world.addChild(this.arek);

        new Tween(this.arek)
            .to({ x: 3700 }, 3000)
            .start()
            .onComplete(this.arekToRight.bind(this));
        this.addChild(this.world);


        // An array of platform data
        const platformData = [
            // 0
            {
                type: "Tile",
                width: 15,
                height: 20,
                posX: 1200,
                posY: 100,
                sizeX: 600,
                sizeY: 660,
            },
            // 1
            {
                type: "Tile",
                width: 30,
                height: 10,
                posX: 195,
                posY: 185,
                sizeX: 1520,
                sizeY: 660,
            },
            // 2
            {
                type: "Tile",
                width: 30,
                height: 10,
                posX: 135,
                posY: 60,
                sizeX: 2300,
                sizeY: 540,
            },
            // 3
            {
                type: "Tile",
                width: 30,
                height: 30,
                posX: 415,
                posY: 160,
                sizeX: 2155,
                sizeY: 640,
            },
            // 4
            {
                type: "Tile",
                width: 30,
                height: 30,
                posX: 500,
                posY: 35,
                sizeX: 2600,
                sizeY: 700,
            },
            // 5
            {
                type: "Tile",
                width: 30,
                height: 30,
                posX: 305,
                posY: 250,
                sizeX: 3005,
                sizeY: 600,
            },
            // 6
            {
                type: "Tile",
                width: 30,
                height: 30,
                posX: 450,
                posY: 30,
                sizeX: 3375,
                sizeY: 620,
            },
            // 7
            {
                type: "Tile",
                width: 30,
                height: 30,
                posX: 140,
                posY: 30,
                sizeX: 3880,
                sizeY: 475,
            },
            // 8
            {
                type: "Tile",
                width: 30,
                height: 30,
                posX: 140,
                posY: 30,
                sizeX: 4290,
                sizeY: 320,
            },
            // 9
            {
                type: "Tile",
                width: 30,
                height: 30,
                posX: 250,
                posY: 90,
                sizeX: 4550,
                sizeY: 670,
            },
            // 10
            {
                type: "Tile",
                width: 30,
                height: 30,
                posX: 140,
                posY: 30,
                sizeX: 4655,
                sizeY: 475,
            },
            // 11
            {
                type: "Tile",
                width: 30,
                height: 30,
                posX: 500,
                posY: 120,
                sizeX: 6350,
                sizeY: 660,
            },
            // 12
            {
                type: "Tile",
                width: 30,
                height: 30,
                posX: 1200,
                posY: 30,
                sizeX: 5700,
                sizeY: 620,
            },
        ];
        // A loop to create and position platforms
        for (let data of platformData) {
            // Create a new platform with the data
            let plat = new Platform(
                data.type,
                data.width,
                data.height,
                data.width,
                data.height,
                data.posX,
                data.posY
            );
            // Set its position
            plat.position.x = data.sizeX;
            plat.position.y = data.sizeY;
            // Add it to the world and the platforms array
            plat.name = `plat${this.platforms.length}`;
            console.log('plat.name', plat.name)
            this.world.addChild(plat);
            this.platforms.push(plat);

        }
        this.cartel = new GenericPanel("lineDark02.png", 35, 35, 35, 35);
        this.cartel.position.set(1050, 500);

        this.chest = new Potion("ChestBox", 850, 600, 0.025, 0.05);
        this.chest.scale.set(-0.15, 0.15);
        this.chest.position.set(6650, 550);
        this.chest.alpha = 0;
        this.world.addChild(this.chest);

        this.aljava = Sprite.from("aljava");
        this.aljava.position.set(400, 40);
        this.aljava.scale.set(0.1);
        this.aljava.anchor.set(0.5);
        this.addChild(this.aljava);

        let arrowsAvailable = this.player.arrowsAvailable;
        this.arrowsOnScreen = new Text(`${arrowsAvailable}`, {
            fontSize: 20,
            fontFamily: "Letra3",
        });
        this.arrowsOnScreen.position.set(400, 55);
        this.addChild(this.arrowsOnScreen);

        this.myLevel = new Text("", LETRA1);
        this.getPlayerLevel();
        this.myLevel.position.set(450, 45);
        this.addChild(this.myLevel);

        // Contador de flechas en pantalla
        this.on("changeArrowAmount", () => {
            this.removeChild(this.arrowsOnScreen);
            let arrowsAvailable = this.player.arrowsAvailable;
            this.arrowsOnScreen = new Text(`${arrowsAvailable}`, {
                fontSize: 20,
                fontFamily: "Letra3",
            });
            this.arrowsOnScreen.position.set(400, 55);
            this.addChild(this.arrowsOnScreen);
        });

        this.start = createPointButton(start, "pointer down", () =>
            this.habilityClick()
        );

        this.buttonA = createPointButton(buttonA, "pointer down", () =>
            this.onButtonA()
        );
        this.buttonA.on("pointerClick", this.Stop, this);

        this.buttonB = createPointButton(buttonB, "pointer down", () =>
            this.onButtonB()
        );
        this.buttonB.on("pointerClick", this.Stop, this);

        this.moveUp = createPointButton(moveUp, "pointer down", () =>
            this.UpMove()
        );

        this.moveDown = createPointButton(moveDown, "pointer down", () =>
            this.DownMove()
        );
        this.moveDown.on("pointerClick", this.Stop, this);

        this.moveLeft = createPointButton(moveLeft, "pointer down", () =>
            this.LeftMove()
        );
        this.moveLeft.on("pointerClick", this.Stop, this);

        this.moveRight = createPointButton(moveRight, "pointer down", () =>
            this.RightMove()
        );
        this.moveRight.on("pointerClick", this.Stop, this);

        this.buttonSound = new ToggleButton(
            Texture.from("TINY_SOUND_BUTTON"),
            Texture.from("TINY_SOUND_BUTTON_OFF")
        );
        this.buttonSound.scale.set(0.087);

        this.buttonSound.x = 1150;
        this.buttonSound.y = 40;
        this.buttonSound.on(ToggleButton.TOGGLE_EVENT, (newState) => {
            console.log("toggle changed to:", newState);
        });

        this.pauseOn = createPointButton(pauseOn, "pointerClick", () =>
            this.onPause()
        );
        this.pauseOff = createPointButton(pauseOff, "pointerClick", () =>
            this.offPause()
        );
        this.buttonsOn = createPointButton(buttonsOn, "pointerClick", () =>
            this.removeButtons()
        );
        this.buttonsOff = createPointButton(buttonsOff, "pointerClick", () =>
            this.showButtons()
        );

        this.melee = new Melee();
        this.melee.position.x = -10;
        this.player.addChild(this.melee);

        this.melee2 = new Melee();
        this.melee2.position.x = -90;
        this.arek.addChild(this.melee2);

        this.range = new Range();
        this.player.addChild(this.range);

        this.potions = [];
        const positions = [
            { x: 3200, y: 550 },
            { x: 4850, y: 600 },
        ];

        for (let i = 0; i < positions.length; i++) {
            const pot = new Potion("Potion", 200, 200);
            pot.scale.set(0.1);
            pot.position.set(positions[i].x, positions[i].y);
            this.world.addChild(pot);
            this.potions.push(pot);
        }

        Player._hp = Player._maxHealth;

        //HPbar y Container para HealthBar
        this.HPbar = new HealthBar(
            "HealthBar",
            250 * (Player._hp / Player._maxHealth),
            60
        );
        console.log("Player._hp", Player._hp);
        this.HPbar.position.set(0, -20);
        this.addChild(this.HPbar);
        this.barra = new GenericPanel("hpFrame2", 40, 40, 40, 40);
        this.barra.position.set(-10, -77);
        this.addChild(this.barra);

        // Enemy's hpbar
        this.HPbar2 = new HealthBar(
            "HealthBar",
            100 * (this.arek.currentHealth / 100),
            10
        );
        this.HPbar2.position.set(-120, -145);
        this.arek.addChild(this.HPbar2);

        this.sortableChildren = true;
        this.dialogBox.zIndex = 1;
        this.addChild(
            this.cartel,
            this.start,
            this.buttonA,
            this.buttonB,
            this.buttonSound,
            this.moveUp,
            this.moveDown,
            this.moveLeft,
            this.moveRight,
            this.pauseOn,
            this.buttonsOn,
            this.dialogBox
        );

        if (!isMobileDevice) {
            this.removeButtons();
        }
    }

    private getPlayerLevel(): void {
        this.myLevel.text = `Player's current level is: ${Player.getLevel()}`;
    }

    /** Función de disparo de las flechas */
    public shootArrow(): void {
        if (this.player.arrowsAvailable > 1) {
            const newArrow = new Arrow();
            newArrow.angle = -20;
            newArrow.position.set(
                this.player.x + this.player.width / 3,
                this.player.y - this.player.height / 3
            );
            newArrow.shoot(newArrow, newArrow.position, this.player.scale.x);

            this.arrows.push(newArrow);
            this.world.addChild(newArrow);
            this.player.arrowsAvailable -= 1;
            this.emit("changeArrowAmount", this.player.arrowsAvailable);
        } else if (this.player.arrowsAvailable === 1) {
            const newArrow = new Arrow();
            newArrow.angle = -20;
            newArrow.position.set(
                this.player.x + this.player.width / 3,
                this.player.y - this.player.height / 3
            );
            newArrow.shoot(newArrow, newArrow.position, this.player.scale.x);

            this.arrows.push(newArrow);
            this.world.addChild(newArrow);
            this.player.arrowsAvailable -= 1;
            this.emit("changeArrowAmount", this.player.arrowsAvailable);

            console.log("You run out of arrows");
            this.removeChild(this.aljava);
            this.aljava = Sprite.from("aljava");
            this.aljava.alpha = 0.3;
            this.aljava.position.set(400, 40);
            this.aljava.scale.set(0.1);
            this.aljava.anchor.set(0.5);
            this.addChild(this.aljava);
        } else {
            console.log("No arrows left");
            this.removeChild(this.aljava);
            this.aljava = Sprite.from("aljava");
            this.aljava.alpha = 0.3;
            this.aljava.position.set(400, 40);
            this.aljava.scale.set(0.1);
            this.aljava.anchor.set(0.5);
            this.addChild(this.aljava);
        }
    }

    public override update(_deltaFrame: number): void {
        if (this.isPaused) {
            return;
        }

        if (this.gameOver) {
            stopAllSFX();
            playSound("PartingBGM", { loop: true, volume: 0.05 });
            SceneManager.changeScene(new GameOverScene());
            stopSounds(["GameBGM"]);
            this.player.initKeyboardEvents(false);
            return;
        }

        if (this.gotToChest) {
            this.player.initKeyboardEvents(false);
            SceneManager.changeScene(new WinScene());
            stopSounds(["GameBGM"]);
        }

        if (!this.gotToChest) {
            this.player.update(_deltaFrame);
        } else {
            this.player.initKeyboardEvents(false);
        }
        this.HPbar.update(_deltaFrame);
        this.HPbar2.update(_deltaFrame);

        const offset = SceneManager.WIDTH / 3;
        const rightLimit = this.player.x + 2 * offset > this.levelSprite.width;
        const leftLimit = this.player.x - offset < 0;

        if (!rightLimit) {
            if (leftLimit) {
                this.player.x = offset;
                this.player.scale.set(-PLAYER_SCALE, PLAYER_SCALE);
            } else {
                this.world.x = -this.player.x * this.worldTransform.a + offset;
            }
        } else {
            if (this.player.x > this.levelSprite.width) {
                this.player.x = this.levelSprite.width;
            }
        }

        // LIMITE INFERIOR
        if (this.player.y > SceneManager.HEIGHT) {
            this.player.y = SceneManager.HEIGHT;
            this.player.canJump = true;
            if (!this.player.hurted) {
                console.log("drowning");
                this.player.hurted = true;
                this.player.animations.playState("hurted");

                // this.gameOver = true;
            }
        }

        // LA COLISION PARA QUE TENGA SU FISICA Y NO CAIGA A TRAVES DE LAS PLATAFORMAS
        for (let platform of this.platforms) {
            const overlap = checkCollision(this.player, platform);
            if (overlap != null) {
                this.player.separate(overlap, platform.position);
            }
        }

        if (!this.dialogBox.hiding) {
            this.checkDialog();
        }

        this.enemyCloseToPlayer();
        this.checkDrinkPotion();
        this.hitWithMelee();
        this.enemyHitPlayer();
        this.rangeHit();
        this.arrowsHit();
        this.endStage();
        this.myOwnHp();
    }

    private checkDialog(): void {
        Keyboard.down.on("KeyE", () => {
            this.dialogBox.setStyle(LETRA4);
            this.dialogBox.setText("No hay nada que hacer aquí, debo continuar.", TEXT_TIME_LETTER_BY_LETTER);
        }, this);
    }


    /** Checks hp situation and changes hpbar color */
    private myOwnHp(): void {
        if (Player._hp > Player._maxHealth * 0.7) {
            this.HPbar.bar.tint = 0xffffff;
        } else if (
            Player._hp > Player._maxHealth * 0.4 &&
            Player._hp < Player._maxHealth * 0.7
        ) {
            this.HPbar.bar.tint = 0xff0000;
        } else if (Player._hp <= Player._maxHealth * 0.4) {
            this.HPbar.bar.tint = 0x000000;
        }
    }

    /** Daño de rango medio */
    public rangeHit(): void {
        const pelea4 = checkCollision(this.range, this.arek);
        if (pelea4 != null) {
            if (!this.player.canBow || Keyboard.state.get("KeyK")) {
                this.arek.getEnemyHurt(Player._bowDamage);
                this.changeEnemyHP();
                if (this.arek.currentHealth <= 0) {
                    this.player.increasePoints(300);
                    this.getPlayerLevel();
                    this.arek.playDestroyAnimation(this.arek);
                    new Tween(this.arek)
                        .to({ alpha: 0 }, 5000)
                        .repeat(3)
                        .start()
                        .onComplete(() => this.world.removeChild(this.arek));
                }
            }
        }
    }

    /** Función de daño con flechas */
    private arrowsHit(): void {
        for (let arrow of this.arrows) {
            const pelea5 = checkCollision(arrow, this.arek);
            if (pelea5 != null) {
                if (this.causingRangeDamage || Keyboard.state.get("KeyL")) {
                    arrow.arrowCollision(pelea5, this.arek.position);
                    this.world.removeChild(arrow);
                    arrow.getEnemyHurt(this.arrowDamage, this.arek);
                    this.changeEnemyHP();
                    if (this.arek.currentHealth <= 0) {
                        this.player.increasePoints(300);
                        this.getPlayerLevel();
                        this.arek.playDestroyAnimation(this.arek);
                        new Tween(this.arek)
                            .to(1000)
                            .start()
                            .onComplete(() => this.world.removeChild(this.arek));
                    }
                }
            }
        }
    }

    /** Chequeo de fin de pantalla */
    private endStage(): void {
        const fin = checkCollision(this.player, this.chest);
        if (fin != null) {
            if (Level.Complete === 3) {
                Level.Complete = 4;
                console.log(Level.CurrentLevel);
            }
            this.gotToChest = true;
            this.chest.destroy();
        }
    }

    /** Función de daño del enemigo al jugador */
    private enemyHitPlayer(): void {
        const pelea3 = checkCollision(this.melee2, this.player);
        if (pelea3 != null) {
            this.arek.attackArek();
            this.player.getPlayerHurt(this.arekDamage);
            this.changePlayerHP();

            if (Player._hp <= 0) {
                this.player.fall();
            }

            if (this.player.hurted) {
                this.player.getUp();
            }
        } else {
            this.arek.idleArek();
        }
    }

    /** Daño cuerpo a cuerpo del jugador al enemigo */
    private hitWithMelee(): void {
        const pelea2 = checkCollision(this.melee, this.arek);
        if (pelea2 != null) {
            if (!this.player.canPunch) {
                this.arek.getEnemyHurt(Player._punchDamage);
                this.changeEnemyHP();
                if (this.arek.currentHealth <= 0) {
                    this.player.increasePoints(300);
                    this.getPlayerLevel();
                    this.arek.playDestroyAnimation(this.arek);
                    new Tween(this.arek)
                        .to(1000)
                        .start()
                        .onComplete(() => {
                            // this.arek.activate(this.onPause());
                            this.world.removeChild(this.arek);
                        });
                }
            }
        }
    }

    /** Función de daño por contacto entre jugador y enemigo */
    private enemyCloseToPlayer(): void {
        const pelea = checkCollision(this.player, this.arek);
        if (pelea != null) {
            this.player.separate(pelea, this.arek.position);
            this.player.getPlayerHurt(this.arekDamage / 5);
            this.changePlayerHP();
            if (Player._hp <= 0) {
                this.world.removeChild(this.player);
                this.gameOver = true;
            }
        }
    }

    /** Función de poción */
    private checkDrinkPotion(): void {
        for (let potion of this.potions) {
            const overlap = checkCollision(this.player, potion);
            if (overlap != null) {
                playSound("PotionSound1", { volume: 0.5 });
                potion.destroy();
                this.player.drinkPotion(50);
                this.changePlayerHP();
            }
        }
    }

    /** Cambio de HP en la barra de vida del enemigo */
    private changeEnemyHP(): void {
        if (this.HPbar2 != undefined) {
            this.HPbar2.destroy();
        }
        this.HPbar2 = new HealthBar(
            "HealthBar",
            100 * (this.arek.currentHealth / 100),
            10
        );
        this.HPbar2.position.set(-120, -145);
        this.arek.addChild(this.HPbar2);
    }

    /** Función que cambia el hp del jugador frente a un evento */
    private changePlayerHP(): void {
        if (this.HPbar != undefined && this.barra != undefined) {
            this.HPbar.destroy();
            this.barra.destroy();
        }
        this.HPbar = new HealthBar(
            "HealthBar",
            250 * (Player._hp / Player._maxHealth),
            60
        );
        this.HPbar.position.set(0, -20);
        this.addChild(this.HPbar);
        this.barra = new GenericPanel("hpFrame2", 40, 40, 40, 40);
        this.barra.position.set(-10, -77);
        this.addChild(this.barra);
    }
    /** Movimiento del enemigo hacia la izquierda */
    private arekToLeft(): void {
        this.arek.scale.set(2, 2);
        new Tween(this.arek)
            .from({ x: 4000 })
            .to({ x: 3700 }, 3000)
            .start()
            .onComplete(this.arekIdleRight.bind(this));
    }

    /** Tween de esperar a la izquierda */
    private arekIdleLeft(): void {
        new Tween(this.arek.idleArek)
            .from({ x: 3700 })
            .to({ x: 3700 }, 3000)
            .start()
            .onComplete(this.arekToLeft.bind(this));
    }

    /** Tween de esperar hacia la derecha */
    private arekIdleRight(): void {
        new Tween(this.arek.idleArek)
            .from({ x: 3800 })
            .to({ x: 3800 }, 3000)
            .start()
            .onComplete(this.arekToRight.bind(this));
    }

    /** Movimiento hacia la derecha */
    private arekToRight(): void {
        this.arek.scale.set(-2, 2);
        new Tween(this.arek)
            .from({ x: 3600 })
            .to({ x: 3900 }, 3000)
            .start()
            .onComplete(this.arekIdleLeft.bind(this));
    }


    /** Pausado de la escena */
    private onPause(): void {
        this.pauseScene = new PauseScene();
        const objectsToRemove = [[]];
        const objectsToAdd = [[this.pauseScene, this.pauseOff]];
        createPopUp(PopUpsNames.PAUSE, objectsToRemove, objectsToAdd, this, Sprite.from("EMPTY_BANNER"), this.popUps);
        this.isPaused = true;
    }

    /** Función para salir de pausa */
    private offPause(): void {
        this.isPaused = false;
        closePopUp(PopUpsNames.PAUSE, this, this.popUps);
    }

    // BOTONES ON - OFF
    /** Función para remover los botones de la escena */
    private removeButtons(): void {
        this.removeChild(
            this.start,
            this.buttonA,
            this.buttonB,
            this.moveUp,
            this.moveDown,
            this.moveLeft,
            this.moveRight,
            this.buttonsOn,
            this.cartel
        );
        this.addChild(this.buttonsOff);
    }

    /** Función para añadir los botones de la escena */
    private showButtons(): void {
        this.removeChild(this.buttonsOff);
        this.addChild(
            this.start,
            this.buttonA,
            this.buttonB,
            this.moveUp,
            this.moveDown,
            this.moveLeft,
            this.moveRight,
            this.buttonsOn,
            this.cartel
        );
    }

    // UI DE MOVIMIENTOS
    /** Tiro con arco y flecha */
    private onButtonB(): void {
        this.player.bow();
        this.causingRangeDamage = true;
    }

    /** Golpe de puño */
    private onButtonA(): void {
        this.player.punch();
        stopSounds(["bow"]);
    }

    /** Función para habilidad especial - Salto */
    private habilityClick(): void {
        this.player.jump();
        this.winStage = true;
        stopSounds(["running", "bow"]);
    }

    /** Correr hacia la derecha */
    private RightMove(): void {
        this.player.runningPostJump = true;
        this.player.runRight();
    }

    /** Correr hacia la izquierda */
    private LeftMove(): void {
        this.player.runningPostJump = true;
        this.player.runLeft();
    }

    /** Agacharse */
    private DownMove(): void {
        this.player.crawl();
    }

    /** Salto */
    private UpMove(): void {
        this.player.jump();
        stopSounds(["running"]);
    }

    /** Alto de todos los movimientos */
    private Stop(): void {
        this.player.idlePlayer();
        stopSounds(["running", "bow"]);
        this.causingRangeDamage = false;
    }

}