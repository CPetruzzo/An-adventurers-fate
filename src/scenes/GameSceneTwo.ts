import { sound } from "@pixi/sound";
import { Container, Point, Sprite, Text, Texture, TilingSprite } from "pixi.js";
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
import { Config } from "./Config";
import { GameOverScene } from "./GameOverScene";
import { SceneBase } from "../utils/SceneBase";
import { Arrow } from "../games/Weapon/Arrow";
import { ButtonParams, buttonA, buttonB, buttonsOff, buttonsOn, configButtonGame, moveDown, moveLeft, moveRight, moveUp, pauseOff, pauseOn, start } from "../utils/ButtonParams";
import { LevelPoints } from "../Logic/LevelPoints";
import { LETRA1 } from "../utils/constants";
import { playSound } from "../utils/SoundParams";

export class GameSceneTwo extends SceneBase implements IUpdateable {
    private playerBardo: Player;
    private world: Container;
    public numero: number = 0;
    private backgrounds: TilingSprite[];
    public gameOver: boolean = false;
    private cartel: GenericPanel;
    private start: PointButton;
    private buttonA: PointButton;
    private buttonB: PointButton;
    private buttonSound: ToggleButton;
    private moveUp: PointButton;
    private moveDown: PointButton;
    private moveLeft: PointButton;
    private moveRight: PointButton;
    private pauseOn: PointButton;
    private pauseOff!: PointButton;
    private barra: GenericPanel;
    public pauseScene!: PauseScene;
    private platforms: Platform[];
    private buttonsOn: PointButton;
    private buttonsOff: PointButton;
    private config: PointButton;
    private potions: Potion[];

    private isPaused: boolean = false;
    private causingDamage: boolean = false;
    private causingRangeDamage: boolean = false;

    private arek: Arek;
    private melee: Melee;
    private melee2: Melee;
    private range: Range;
    private arekDamage: number = 1;

    private HPbar: HealthBar;
    private HPbar2: HealthBar;
    private chest: Potion;
    private win: WinScene;
    public winStage: boolean = false;
    public nextStage: boolean = false;
    private arrows: Arrow[];
    private arrowDamage: number = 20;
    public arrowsOnScreen: Text;
    private aljava: Sprite;
    public myLevel: Text;

    constructor() {
        super();

        this.backgrounds = [];
        this.arrows = [];
        this.world = new Container();

        const BGM = sound.find("GameBGM");
        BGM.play({ loop: true, volume: 0.05 })

        // FONDOS
        for (let i = 7; i < 12; i++) {
            const background = new TilingSprite(
                Texture.from("B" + i),
                1280,
                720
            );
            this.addChild(background);
            this.backgrounds.push(background);
        }

        this.playerBardo = new Player();
        this.playerBardo.scale.set(2);
        this.playerBardo.position.y = 450;
        this.world.addChild(this.playerBardo);

        this.playerBardo.on("shoot", () => {
            this.shootArrow();
        });

        this.arek = new Arek();
        this.arek.scale.set(2);
        this.arek.position.y = 250;
        this.arek.position.x = 3700;
        this.world.addChild(this.arek);

        new Tween(this.arek)
            .to({ x: 3700 }, 3000)
            .start().onComplete(this.arekToRight.bind(this));
        this.addChild(this.world);

        this.platforms = [];
        // An array of platform data
        const platformData = [
            { type: "Tile", width: 15, height: 20, posX: 1000, posY: 100, sizeX: 50, sizeY: 677 },
            { type: "Tile", width: 30, height: 10, posX: 200, posY: 100, sizeX: 600, sizeY: 475 },
            { type: "Tile", width: 30, height: 10, posX: 200, posY: 100, sizeX: 760, sizeY: 250 },
            { type: "Tile", width: 30, height: 10, posX: 300, posY: 100, sizeX: 1400, sizeY: 150 },
            { type: "Tile", width: 30, height: 30, posX: 500, posY: 100, sizeX: 2500, sizeY: 700 },
            { type: "Tile", width: 30, height: 30, posX: 500, posY: 100, sizeX: 2800, sizeY: 677 },
            { type: "Tile", width: 30, height: 30, posX: 500, posY: 100, sizeX: 3505, sizeY: 475 },
            { type: "Tile", width: 30, height: 30, posX: 500, posY: 100, sizeX: 3805, sizeY: 270 },
            { type: "Tile", width: 30, height: 30, posX: 500, posY: 100, sizeX: 4105, sizeY: 675 },
            { type: "Tile", width: 30, height: 30, posX: 500, posY: 100, sizeX: 3005, sizeY: 500 },
            { type: "Tile", width: 30, height: 30, posX: 500, posY: 100, sizeX: 4405, sizeY: 705 },
            { type: "Tile", width: 30, height: 30, posX: 500, posY: 100, sizeX: 4755, sizeY: 500 },
            { type: "Tile", width: 30, height: 30, posX: 500, posY: 100, sizeX: 5000, sizeY: 700 },
            { type: "Tile", width: 30, height: 30, posX: 500, posY: 100, sizeX: 5405, sizeY: 500 },
            { type: "Tile", width: 30, height: 30, posX: 200, posY: 100, sizeX: 6000, sizeY: 475 },
            { type: "Tile", width: 30, height: 30, posX: 500, posY: 100, sizeX: 6350, sizeY: 250 },
        ];
        // A loop to create and position platforms
        for (let data of platformData) {
            // Create a new platform with the data
            let plat = new Platform(data.type, data.width, data.height, data.width, data.height, data.posX, data.posY);
            // Set its position
            plat.position.x = data.sizeX;
            plat.position.y = data.sizeY;
            // Add it to the world and the platforms array
            this.world.addChild(plat);
            this.platforms.push(plat);

            let numero = platformData.indexOf
            console.log(numero);
        }

        this.cartel = new GenericPanel("lineDark02.png", 35, 35, 35, 35);
        this.cartel.position.set(1050, 500);

        this.chest = new Potion("ChestBox", 850, 600, 0.025, 0.05);
        this.chest.scale.set(-0.15, 0.15);
        this.chest.position.set(6350, 125);
        this.world.addChild(this.chest);

        this.aljava = Sprite.from("aljava");
        this.aljava.position.set(400, 40);
        this.aljava.scale.set(0.1);
        this.aljava.anchor.set(0.5);
        this.addChild(this.aljava);

        let arrowsAvailable = this.playerBardo.arrowsAvailable;
        this.arrowsOnScreen = new Text(`${arrowsAvailable}`, { fontSize: 20, fontFamily: ("Letra3") });
        this.arrowsOnScreen.position.set(400, 55)
        this.addChild(this.arrowsOnScreen);

        this.myLevel = new Text(`Player's current level is: ${Player.getLevel()}`, LETRA1)
        this.myLevel.position.set(450, 45)
        this.addChild(this.myLevel);

        // Contador de flechas en pantalla
        this.on("changeArrowAmount", () => {
            this.removeChild(this.arrowsOnScreen);
            let arrowsAvailable = this.playerBardo.arrowsAvailable;
            this.arrowsOnScreen = new Text(`${arrowsAvailable}`, { fontSize: 20, fontFamily: ("Letra3") });
            this.arrowsOnScreen.position.set(400, 55)
            this.addChild(this.arrowsOnScreen);
        });

        this.start = this.createPointButton(start);
        this.start.on("pointer down", this.habilityClick, this);

        this.buttonA = this.createPointButton(buttonA);
        this.buttonA.on("pointer down", this.onButtonA, this)
        this.buttonA.on("pointerClick", this.Stop, this);

        this.buttonB = this.createPointButton(buttonB);
        this.buttonB.on("pointer down", this.onButtonB, this)
        this.buttonB.on("pointerClick", this.Stop, this);

        this.moveUp = this.createPointButton(moveUp);
        this.moveUp.on("pointer down", this.UpMove, this)

        this.moveDown = this.createPointButton(moveDown);
        this.moveDown.on("pointer down", this.DownMove, this)
        this.moveDown.on("pointerClick", this.Stop, this)

        this.moveLeft = this.createPointButton(moveLeft);
        this.moveLeft.on("pointer down", this.LeftMove, this)
        this.moveLeft.on("pointerClick", this.Stop, this)

        this.moveRight = this.createPointButton(moveRight);
        this.moveRight.on("pointer down", this.RightMove, this)
        this.moveRight.on("pointerClick", this.Stop, this)

        this.buttonSound = new ToggleButton(
            Texture.from("lineDark12.png"),
            Texture.from("lineDark14.png"));
        this.buttonSound.height = 70;
        this.buttonSound.width = 70;
        this.buttonSound.x = 1150
        this.buttonSound.y = 40
        this.buttonSound.on(ToggleButton.TOGGLE_EVENT, (newState) => {
            console.log("toggle changed to:", newState)
        })

        this.pauseOn = this.createPointButton(pauseOn);
        this.pauseOn.on("pointerClick", this.onPause, this)

        this.pauseOff = this.createPointButton(pauseOff);
        this.pauseOff.on("pointerClick", this.offPause, this)

        this.buttonsOn = this.createPointButton(buttonsOn);
        this.buttonsOn.on("pointerClick", this.removeButtons, this);

        this.buttonsOff = this.createPointButton(buttonsOff);
        this.buttonsOff.on("pointerClick", this.showButtons, this)

        this.config = this.createPointButton(configButtonGame);
        this.config.on("pointerClick", this.onConfigClick, this)

        this.melee = new Melee();
        this.melee.position.x = -10
        this.playerBardo.addChild(this.melee);

        this.melee2 = new Melee();
        this.melee2.position.x = -90;
        this.arek.addChild(this.melee2)

        this.range = new Range();
        this.playerBardo.addChild(this.range);

        this.potions = [];
        const positions = [
            { x: 3000, y: 580 },
            { x: 4850, y: 600 }
        ];

        for (let i = 0; i < positions.length; i++) {
            const pot = new Potion("Potion", 200, 200);
            pot.scale.set(0.1);
            pot.spr.tint = 0x00ff;

            pot.position.set(positions[i].x, positions[i].y);
            this.world.addChild(pot);
            this.potions.push(pot);
        }

        Player._hp = Player._maxHealth

        //HPbar y Container para HealthBar
        this.HPbar = new HealthBar("HealthBar", (250 * ((Player._hp) / Player._maxHealth)), 60);
        console.log('Player._hp', Player._hp)
        this.HPbar.position.set(0, -20);
        this.addChild(this.HPbar);
        this.barra = new GenericPanel("hpFrame2", 40, 40, 40, 40);
        this.barra.position.set(-10, -77);
        this.addChild(this.barra);

        // Enemy's hpbar
        this.HPbar2 = new HealthBar("HealthBar", (100 * ((this.arek.currentHealthLvl2) / 100)), 10);
        this.HPbar2.position.set(-120, -145);
        this.arek.addChild(this.HPbar2);

        this.win = new WinScene();

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
        )


        // // PORTFOLIO
        // this.aboutMe = new Text("Portfolio", { fontFamily: "Arial", fill: "#fff", align: "center" });
        // this.aboutMe.anchor.set(0.5, 0);
        // this.aboutMe.position.set(SceneManager.WIDTH / 2, 0);
        // this.world.addChild(this.aboutMe);

        // this.aboutMeText = new Text("Hola, mi nombre es Facundo y este es mi portfolio hecho en PixiJS", { fontFamily: "Arial", fill: "#fff", align: "center" });
        // this.aboutMeText.position.set(this.aboutMe.x - this.aboutMeText.width / 2, this.aboutMe.y + this.aboutMe.height);
        // this.world.addChild(this.aboutMeText);

        // // ACERCA DE MI
        // this.aboutMe2 = new Text("Acerca de mi", { fontFamily: "Arial", fill: "#fff", align: "center" });
        // this.aboutMe2.anchor.set(0.5, 0);
        // this.aboutMe2.position.set(2 * SceneManager.WIDTH, 0);
        // this.world.addChild(this.aboutMe2);

        // this.aboutMeText2 = new Text("Tengo 33 años, soy Ingeniero en Alimentos, nacido en Santa Fe, Argentina y vivo en Entre Ríos", { fontFamily: "Arial", fill: "#fff", align: "center" });
        // this.aboutMeText2.position.set(this.aboutMe2.x - this.aboutMeText2.width / 2, this.aboutMe2.y + this.aboutMe2.height);
        // this.world.addChild(this.aboutMeText2);
    }


    public levelOnScreen(): void {
        if (this.myLevel != undefined) {
            this.removeChild(this.myLevel);
            this.myLevel = new Text(`Player's current level is: ${Player.getLevel()}`, LETRA1)
            this.myLevel.position.set(450, 45)
            this.addChild(this.myLevel);
        } else {
            this.myLevel = new Text(`Player's current level is: ${Player.getLevel()}`, LETRA1)
            this.myLevel.position.set(450, 45)
            this.addChild(this.myLevel);
        }
        console.log("bow", Player._bowDamage)
        console.log("punch", Player._punchDamage)
        console.log("maxhp", Player._maxHealth)
    }
    /** Función de disparo de las flechas */
    public shootArrow(): void {
        if (this.playerBardo.arrowsAvailable > 0) {
            const newArrow = new Arrow();
            newArrow.angle = -20
            newArrow.position.set(this.playerBardo.x + this.playerBardo.width / 3, this.playerBardo.y - this.playerBardo.height / 3);
            newArrow.shoot(newArrow, newArrow.position, this.playerBardo.scale.x);

            this.arrows.push(newArrow);
            this.world.addChild(newArrow);
            this.playerBardo.arrowsAvailable -= 1;

            this.emit("changeArrowAmount", this.playerBardo.arrowsAvailable);
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

    // ACTUALIZACION PARA DARLE SU FISICA Y SU MOVIMIENTO
    public update(_deltaFrame: number, deltaTime: number): void {
        if (this.isPaused) {
            return;
        }

        if (this.gameOver) {
            this.playerBardo.increasePoints(-2000);
            this.levelOnScreen();
            console.log("Current Level: ", Player.getLevel());
            console.log('this.playerBardo.levelPoints.requiredPoints', LevelPoints.requiredPoints)
            console.log('this.playerBardo.levelPoints.points', LevelPoints.points)

            const GameOverBGM = sound.find("PartingBGM");
            GameOverBGM.play({ loop: true, volume: 0.05 })
            SceneManager.changeScene(new GameOverScene());
            sound.stop("GameBGM");
        }

        if (this.nextStage) {
            SceneManager.changeScene(new WinScene());
            sound.stop("GameBGM");
        }

        this.playerBardo.update(deltaTime); // Actualizacion del personaje
        this.HPbar.update(deltaTime); // Actualizacion del barra de vida
        this.HPbar2.update(deltaTime); // Actualizacion del barra de vida
        this.win.update(deltaTime); // Actualizacion del caja al final de la partida

        // PARALLAX
        for (let i = 0; i < this.backgrounds.length; i++) {
            const background = this.backgrounds[i];
            const factor = (i / 6);
            if (this.playerBardo.x < 0) {
                background.tilePosition.x = background.tilePosition.x;
            }
            else {
                background.tilePosition.x -= factor * this.playerBardo.speed.x / 50;
            }
        }

        // LA COLISION PARA QUE TENGA SU FISICA Y NO CAIGA A TRAVES DE LAS PLATAFORMAS
        for (let platform of this.platforms) {
            const overlap = checkCollision(this.playerBardo, platform);
            if (overlap != null) {
                this.playerBardo.separate(overlap, platform.position);
            }
        }

        // LIMITE IZQUIERDO 
        if (this.playerBardo.x < 0) {
            this.playerBardo.x = 0;
            this.world.x = 0;
            this.playerBardo.scale.set(-2, 2);
        }

        // LIMITE INFERIOR
        if (this.playerBardo.y > (SceneManager.HEIGHT)) {
            this.playerBardo.y = (SceneManager.HEIGHT);
            this.playerBardo.canJump = true;
            this.gameOver = true;
        }

        // if(this.playerBardo.canJump){
        //     this.playerBardo.checkWhatsHeDoing();
        // }

        // CAMARA SEGUÍ A MI PERSONAJE
        (this.world.x = - this.playerBardo.x * this.worldTransform.a + SceneManager.WIDTH / 3)

        // Chequeo de cada una de las situaciones posibles en el update
        this.enemyCloseToPlayer();
        this.drinkPotion();
        this.hitWithMelee();
        this.enemyHitPlayer();
        this.rangeHit();
        this.arrowsHit();
        this.endStage();
        this.myOwnHp();
    }

    /** Checks hp situation and changes hpbar color */
    private myOwnHp(): void {
        if (Player._hp > Player._maxHealth * 0.7) {
            this.HPbar.bar.tint = 0xffffff
        } else if (Player._hp > Player._maxHealth * 0.4 && Player._hp < Player._maxHealth * 0.7) {
            this.HPbar.bar.tint = 0xff0000
        } else if (Player._hp <= Player._maxHealth * 0.4) {
            this.HPbar.bar.tint = 0x000000
        }
    }

    /** Daño de rango medio */
    private rangeHit(): void {
        const pelea4 = checkCollision(this.range, this.arek);
        if (pelea4 != null) {
            if ((this.causingRangeDamage || Keyboard.state.get("KeyK"))) {
                this.arek.getEnemyHurt(Player._bowDamage);
                this.changeEnemyHP();
                if (this.arek.currentHealth <= 0) {
                    this.playerBardo.increasePoints(1000);
                    this.levelOnScreen();
                    console.log("bow", Player._bowDamage)
                    console.log("Current Level: ", Player.getLevel());
                    console.log('this.playerBardo.levelPoints.requiredPoints', LevelPoints.requiredPoints)
                    console.log('this.playerBardo.levelPoints.points', LevelPoints.points)
                    this.arek.playDestroyAnimation(this.arek);
                    new Tween(this.arek).to({ alpha: 0 }, 5000).repeat(3).start().onComplete(() => this.world.removeChild(this.arek));
                }
            }
        }
    }

    /** Función de daño con flechas */
    private arrowsHit(): void {
        for (let arrow of this.arrows) {
            const pelea5 = checkCollision(arrow, this.arek);
            if (pelea5 != null) {
                if ((this.causingRangeDamage || Keyboard.state.get("KeyL"))) {
                    arrow.arrowCollision(pelea5, this.arek.position);
                    this.world.removeChild(arrow);
                    arrow.getEnemyHurt(this.arrowDamage, this.arek);
                    this.changeEnemyHP();
                    if (this.arek.currentHealth <= 0) {
                        this.playerBardo.increasePoints(1000);
                        console.log("sworddamage", this.playerBardo._swordDamage)
                        console.log("Current Level: ", Player.getLevel());
                        this.levelOnScreen();
                        console.log("bow", Player._bowDamage)
                        console.log('this.playerBardo.levelPoints.requiredPoints', LevelPoints.requiredPoints)
                        console.log('this.playerBardo.levelPoints.points', LevelPoints.points)
                        this.arek.playDestroyAnimation(this.arek);
                        new Tween(this.arek).to(1000).start().onComplete(() => this.world.removeChild(this.arek));
                    }
                }
            }
        }
    }

    /** Chequeo de fin de pantalla */
    private endStage(): void {
        const fin = checkCollision(this.playerBardo, this.chest);
        if (fin != null) {
            this.chest.destroy();
            this.addChild(this.win);
        }
    }

    /** Función de daño del enemigo al jugador */
    private enemyHitPlayer(): void {
        const pelea3 = checkCollision(this.melee2, this.playerBardo);
        if (pelea3 != null) {
            this.arek.attackArek();
            this.playerBardo.getPlayerHurt(this.arekDamage);
            this.changePlayerHP();

            if (Player._hp <= 0) {
                this.playerBardo.fall();
            }

            if (this.playerBardo.hurted) {
                this.playerBardo.getUp();
            }

        } else {
            this.arek.idleArek();
        }
    }

    /** Daño cuerpo a cuerpo del jugador al enemigo */
    private hitWithMelee(): void {
        const pelea2 = checkCollision(this.melee, this.arek);
        if (pelea2 != null) {
            if ((this.causingDamage || Keyboard.state.get("KeyJ"))) {
                this.arek.getEnemyHurt(Player._punchDamage);
                this.changeEnemyHP();
                if (this.arek.currentHealth <= 0) {
                    this.playerBardo.increasePoints(10000);
                    this.levelOnScreen();
                    console.log("bow", Player._bowDamage)
                    console.log("Current Level: ", Player.getLevel());
                    console.log('this.playerBardo.levelPoints.requiredPoints', LevelPoints.requiredPoints)
                    console.log('this.playerBardo.levelPoints.points', LevelPoints.points)
                    this.arek.playDestroyAnimation(this.arek);
                    new Tween(this.arek).to(1000).start().onComplete(() => this.world.removeChild(this.arek));
                }
            }
        }
    }

    /** Función de daño por contacto entre jugador y enemigo */
    private enemyCloseToPlayer(): void {
        const pelea = checkCollision(this.playerBardo, this.arek);
        if (pelea != null) {
            this.playerBardo.separate(pelea, this.arek.position);
            this.playerBardo.getPlayerHurt(this.arekDamage / 5);
            this.changePlayerHP();
            if (Player._hp <= 0) {
                this.world.removeChild(this.playerBardo);
                this.gameOver = true;
            }
        }
    }

    /** Función de poción */
    private drinkPotion(): void {
        for (let potion of this.potions) {
            const overlap = checkCollision(this.playerBardo, potion);
            if (overlap != null) {
                playSound("PotionSound1", { volume: 0.5 });
                potion.destroy();
                this.playerBardo.drinkPotion(50);
                this.changePlayerHP();
            }
        }
    }

    /** Cambio de HP en la barra de vida del enemigo */
    private changeEnemyHP(): void {
        if (this.HPbar2 != undefined) {
            this.HPbar2.destroy();
        }
        this.HPbar2 = new HealthBar("HealthBar", (100 * ((this.arek.currentHealthLvl2) / this.arek.maxHP2)), 10);
        this.HPbar2.position.set(-120, -145);
        this.arek.addChild(this.HPbar2);
    }

    /** Función que cambia el hp del jugador frente a un evento */
    private changePlayerHP(): void {
        if (this.HPbar != undefined && this.barra != undefined) {
            this.HPbar.destroy();
            this.barra.destroy();
        }
        this.HPbar = new HealthBar("HealthBar", (250 * ((Player._hp) / Player._maxHealth)), 60);
        this.HPbar.position.set(0, -20);
        this.addChild(this.HPbar);
        this.barra = new GenericPanel("hpFrame2", 40, 40, 40, 40);
        this.barra.position.set(-10, -77);
        this.addChild(this.barra);
    }

    // TWEENS DE LOS MOVIMIENTOS DE AREK
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

    // BOTON DE PAUSE
    /** Pausado de la escena */
    private onPause(): void {
        this.isPaused = true;
        this.pauseScene = new PauseScene();
        this.removeChild(this.start,
            this.buttonA,
            this.buttonB,
            this.moveUp,
            this.moveDown,
            this.moveLeft,
            this.moveRight,
            this.cartel
        );
        this.addChild(this.pauseScene,
            this.pauseOff,
        );
    }

    /** Función para salir de pausa */
    private offPause(): void {
        this.isPaused = false;
        this.removeChild(this.pauseScene,
            this.pauseOff,
        );
        this.addChild(this.start,
            this.buttonA,
            this.buttonB,
            this.moveUp,
            this.moveDown,
            this.moveLeft,
            this.moveRight,
            this.cartel
        );
    }

    // BOTONES ON - OFF
    /** Función para remover los botones de la escena */
    private removeButtons(): void {
        this.removeChild(this.start,
            this.buttonA,
            this.buttonB,
            this.moveUp,
            this.moveDown,
            this.moveLeft,
            this.moveRight,
            this.buttonsOn,
            this.cartel,
        );
        this.addChild(this.buttonsOff);
    }

    /** Función para añadir los botones de la escena */
    private showButtons(): void {
        this.removeChild(this.buttonsOff);
        this.addChild(this.start,
            this.buttonA,
            this.buttonB,
            this.moveUp,
            this.moveDown,
            this.moveLeft,
            this.moveRight,
            this.buttonsOn,
            this.cartel,
        );
    }

    // UI DE MOVIMIENTOS
    /** Cambio de escena a la escena de Configuración */
    private onConfigClick(): void {
        SceneManager.changeScene(new Config());
        sound.stop("GameBGM");
    }

    /** Tiro con arco y flecha */
    private onButtonB(): void {
        this.playerBardo.bow();
        this.causingRangeDamage = true;
    }

    /** Golpe de puño */
    private onButtonA(): void {
        this.playerBardo.punch();
        this.causingDamage = true;
        sound.stop("bow");
    }

    /** Función para habilidad especial - Salto */
    private habilityClick(): void {
        this.playerBardo.jump();
        this.winStage = true;
        sound.stop("running");
        sound.stop("bow");
    }

    /** Correr hacia la derecha */
    private RightMove(): void {
        this.playerBardo.runRight();
    }

    /** Correr hacia la izquierda */
    private LeftMove(): void {
        this.playerBardo.runLeft();
    }

    /** Agacharse */
    private DownMove(): void {
        this.playerBardo.crawl();

    }

    /** Salto */
    private UpMove(): void {
        this.playerBardo.jump();
        sound.stop("running");

    }

    /** Alto de todos los movimientos */
    private Stop(): void {
        this.playerBardo.idlePlayer();
        sound.stop("running");
        sound.stop("bow");
        this.causingRangeDamage = false;
        this.causingDamage = false;
    }

    // Use a function to create PointButtons with common parameters
    public createPointButton(params: ButtonParams): PointButton {
        return new PointButton(
            Texture.from(params.textureNameDef),
            Texture.from(params.textureOver),
            Texture.from(params.textureNameDef),
            new Point(params.x, params.y),
            params.scale
        );
    };
}