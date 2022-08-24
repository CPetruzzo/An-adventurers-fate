import { sound } from "@pixi/sound";
import { Container, Texture, TilingSprite } from "pixi.js";
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
// import { MapScene } from "./MapScene";
import { MapScene2 } from "./MapScene2";

export class GameScene extends SceneBase implements IUpdateable {

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
    private punchDamage: number = 2;
    private rangeDamage: number = 1;
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


    constructor() {
        super();
        this.backgrounds = [];

        this.world = new Container();

        const BGM = sound.find("GameBGM");
        BGM.play({ loop: true, volume: 0.05 })

        // FONDOS
        for (let i = 1; i < 6; i++) {
            const background = new TilingSprite(
                Texture.from("B" + i),
                1280,
                720
            );
            this.addChild(background);
            this.backgrounds.push(background);
        }

        // UN JUGADOR
        this.playerBardo = new Player();
        this.playerBardo.scale.set(2);
        this.playerBardo.position.y = 450;
        this.world.addChild(this.playerBardo);

        this.arek = new Arek();
        this.arek.scale.set(2);
        this.arek.position.y = 250;
        this.arek.position.x = 3700;
        this.world.addChild(this.arek);

        new Tween(this.arek)
            .to({ x: 3700 }, 3000)
            .start().onComplete(this.arekToRight.bind(this));


        this.addChild(this.world);

        // LA PLATAFORMA PARA PISAR
        this.platforms = [];
        const plat1 = new Platform("Tile", 15, 20, 15, 20, 1000, 100);
        plat1.position.x = 50;
        plat1.position.y = 677;
        const plat2 = new Platform("Tile", 30, 10, 30, 10, 200, 100);
        plat2.position.x = 600;
        plat2.position.y = 475;
        const plat3 = new Platform("Tile", 30, 10, 30, 10, 200, 100);
        plat3.position.x = 760;
        plat3.position.y = 250;
        const plat4 = new Platform("Tile", 30, 10, 30, 10, 300, 100);
        plat4.position.x = 1400;
        plat4.position.y = 150;
        const plat5 = new Platform("Tile", 30, 30, 30, 30, 500, 100);
        plat5.position.x = 2500;
        plat5.position.y = 700;
        const plat6 = new Platform("Tile", 30, 30, 30, 30, 500, 100);
        plat6.position.x = 2800;
        plat6.position.y = 677;
        const plat7 = new Platform("Tile", 30, 30, 30, 30, 500, 100);
        plat7.position.x = 3505;
        plat7.position.y = 475;
        const plat8 = new Platform("Tile", 30, 30, 30, 30, 500, 100);
        plat8.position.x = 3805;
        plat8.position.y = 270;
        const plat9 = new Platform("Tile", 30, 30, 30, 30, 500, 100);
        plat9.position.x = 4105;
        plat9.position.y = 675;
        const plat10 = new Platform("Tile", 30, 30, 30, 30, 500, 100);
        plat10.position.x = 3005;
        plat10.position.y = 500;
        const plat11 = new Platform("Tile", 30, 30, 30, 30, 500, 100);
        plat11.position.x = 4405;
        plat11.position.y = 705;
        const plat12 = new Platform("Tile", 30, 30, 30, 30, 500, 100);
        plat12.position.x = 4755;
        plat12.position.y = 500;
        const plat13 = new Platform("Tile", 30, 30, 30, 30, 500, 100);
        plat13.position.x = 5005;
        plat13.position.y = 700;
        const plat14 = new Platform("Tile", 30, 30, 30, 30, 500, 100);
        plat14.position.x = 5405;
        plat14.position.y = 500;
        const plat15 = new Platform("Tile", 30, 10, 30, 10, 200, 100);
        plat15.position.x = 6000;
        plat15.position.y = 475;
        const plat16 = new Platform("Tile", 30, 10, 30, 10, 500, 100);
        plat16.position.x = 6350;
        plat16.position.y = 250;


        this.world.addChild(plat1,
            plat2,
            plat3,
            plat4,
            plat5,
            plat6,
            plat7,
            plat8,
            plat9,
            plat10,
            plat11,
            plat12,
            plat13,
            plat14,
            plat15,
            plat16,
        );

        this.platforms.push(plat1,
            plat2,
            plat3,
            plat4,
            plat5,
            plat6,
            plat7,
            plat8,
            plat9,
            plat10,
            plat11,
            plat12,
            plat13,
            plat14,
            plat15,
            plat16,
        );

        //Habillity Circle
        this.cartel = new GenericPanel("lineDark02.png", 35, 35, 35, 35);
        this.cartel.position.set(1050, 500);

        this.chest = new Potion("ChestBox", 850, 600, 0.025, 0.05);
        this.chest.scale.set(-0.15, 0.15);
        this.chest.position.set(6350, 125);
        this.world.addChild(this.chest);

        //Container para HealthBar
        this.barra = new GenericPanel("lineDark03.png", 80, 80, 80, 80);
        this.barra.scale.x = 2
        this.barra.scale.y = 0.4
        this.barra.position.set(10, 10);
        this.addChild(this.barra);

        { /* Habillity */
            this.start = new PointButton(Texture.from("lineDark44.png"),
                Texture.from("lineLight47.png"),
                Texture.from("lineDark44.png"));
            this.start.x = this.cartel.x + 80
            this.start.y = this.cartel.y + 80
            this.start.scale.x = 1.2;
            this.start.scale.y = 1.2;
            this.start.on("pointer down", this.habilityClick, this)

        }

        { /* A Button */
            this.buttonA = new PointButton(Texture.from("lineDark31.png"),
                Texture.from("lineLight34.png"),
                Texture.from("lineDark31.png"));
            this.buttonA.x = 980
            this.buttonA.y = 540
            this.buttonA.scale.x = 1;
            this.buttonA.scale.y = 1;
            this.buttonA.on("pointer down", this.onButtonA, this)
            this.buttonA.on("pointerClick", this.Stop, this)
        }

        { /* B Button */
            this.buttonB = new PointButton(Texture.from("lineDark32.png"),
                Texture.from("lineLight35.png"),
                Texture.from("lineDark32.png"));
            this.buttonB.x = 1120
            this.buttonB.y = 430
            this.buttonB.scale.x = 1;
            this.buttonB.scale.y = 1;
            this.buttonB.on("pointer down", this.onButtonB, this)
            this.buttonB.on("pointerClick", this.Stop, this)
        }

        { /* Move Up */
            this.moveUp = new PointButton(Texture.from("lineDark48.png"),
                Texture.from("lineLight01.png"),
                Texture.from("lineDark48.png"));
            this.moveUp.x = 180
            this.moveUp.y = 440
            this.moveUp.scale.x = 1.8;
            this.moveUp.scale.y = 1.8;
            this.moveUp.on("pointer down", this.UpMove, this)

        }

        { /* Move Down */
            this.moveDown = new PointButton(Texture.from("lineDark05.png"),
                Texture.from("lineLight08.png"),
                Texture.from("lineDark05.png"));
            this.moveDown.x = 180
            this.moveDown.y = 620
            this.moveDown.scale.x = 1.8;
            this.moveDown.scale.y = 1.8;
            this.moveDown.on("pointer down", this.DownMove, this)
            this.moveDown.on("pointerClick", this.Stop, this)
        }
        { /* Move Left */
            this.moveLeft = new PointButton(Texture.from("lineDark00.png"),
                Texture.from("lineLight03.png"),
                Texture.from("lineDark00.png"));
            this.moveLeft.x = 100
            this.moveLeft.y = 530
            this.moveLeft.scale.x = 1.8;
            this.moveLeft.scale.y = 1.8;
            this.moveLeft.on("pointer down", this.LeftMove, this)
            this.moveLeft.on("pointerClick", this.Stop, this)
        }
        { /* Move Right */
            this.moveRight = new PointButton(Texture.from("lineDark01.png"),
                Texture.from("lineLight04.png"),
                Texture.from("lineDark01.png"));
            this.moveRight.x = 260
            this.moveRight.y = 530
            this.moveRight.scale.x = 1.8;
            this.moveRight.scale.y = 1.8;
            this.moveRight.on("pointer down", this.RightMove, this)
            this.moveRight.on("pointerClick", this.Stop, this)
        }

        // Sound ON-OFF
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

        { /* Pause */
            this.pauseOn = new PointButton(Texture.from("lineDark28.png"),
                Texture.from("lineLight31.png"),
                Texture.from("lineDark28.png"));
            this.pauseOn.x = 1230
            this.pauseOn.y = 40
            this.pauseOn.scale.x = 1.45;
            this.pauseOn.scale.y = 1.45;
            this.pauseOn.on("pointerClick", this.onPause, this)

            this.pauseOff = new PointButton(Texture.from("lineDark28.png"),
                Texture.from("lineLight31.png"),
                Texture.from("lineDark28.png"));
            this.pauseOff.x = 1230
            this.pauseOff.y = 40
            this.pauseOff.scale.x = 1.45;
            this.pauseOff.scale.y = 1.45;
            this.pauseOff.on("pointerClick", this.offPause, this)
        }

        { /* BUTTONS */
            this.buttonsOn = new PointButton(Texture.from("lineDark28.png"),
                Texture.from("lineLight31.png"),
                Texture.from("lineDark28.png"));
            this.buttonsOn.x = 1070
            this.buttonsOn.y = 40
            this.buttonsOn.scale.x = 1.45;
            this.buttonsOn.scale.y = 1.45;
            this.buttonsOn.on("pointerClick", this.removeButtons, this)

            this.buttonsOff = new PointButton(Texture.from("lineDark28.png"),
                Texture.from("lineLight31.png"),
                Texture.from("lineDark28.png"));
            this.buttonsOff.x = 1070
            this.buttonsOff.y = 40
            this.buttonsOff.scale.x = 1.45;
            this.buttonsOff.scale.y = 1.45;
            this.buttonsOff.on("pointerClick", this.showButtons, this)
        }

        this.config = new PointButton(Texture.from("CONFIG.png"),
            Texture.from("CONFIG hundido.png"),
            Texture.from("CONFIG.png"));
        this.config.x = 650
        this.config.y = 500
        this.config.scale.x = 0.5;
        this.config.scale.y = 0.5;
        this.config.on("pointerClick", this.onConfigClick, this)

        this.addChild(this.cartel);

        this.melee = new Melee();
        this.melee.position.x = -10
        this.playerBardo.addChild(this.melee);

        this.melee2 = new Melee();
        this.melee2.position.x = -90;
        this.arek.addChild(this.melee2)

        this.range = new Range();
        this.playerBardo.addChild(this.range);

        this.potions = [];
        const pot1 = new Potion("Potion", 200, 200);
        pot1.scale.set(0.1);
        pot1.position.set(3000, 580)
        this.world.addChild(pot1);
        this.potions.push(pot1);

        const pot2 = new Potion("Potion", 200, 200);
        pot2.scale.set(0.1);
        pot2.position.set(4850, 600);
        this.world.addChild(pot2);
        this.potions.push(pot2);

        this.HPbar = new HealthBar("HealthBar", (275 * ((this.playerBardo.currentHealth) / 100)), 25);
        this.addChild(this.HPbar);

        this.HPbar2 = new HealthBar("HealthBar", (100 * ((this.arek.currentHealth) / 100)), 10);
        this.HPbar2.position.set(-120, -145);
        this.arek.addChild(this.HPbar2);

        this.win= new WinScene();

        this.addChild(
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
        
    }

    // ACTUALIZACION PARA DARLE SU FISICA Y SU MOVIMIENTO
    public update(_deltaFrame: number, deltaTime: number): void {
        if (this.isPaused) {
            return;
        }

        if (this.gameOver) {
            SceneManager.changeScene(new GameOverScene());
            sound.stop("GameBGM");
            const GameOverBGM = sound.find("PartingBGM");
            GameOverBGM.play({ loop: true, volume: 0.05 })
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


        // CAMARA SEGUÍ A MI PERSONAJE
        (this.world.x = - this.playerBardo.x * this.worldTransform.a + SceneManager.WIDTH / 3)

        // JUGADOR Y ENEMIGO HACIENDO COLISION
        const pelea = checkCollision(this.playerBardo, this.arek);
        if (pelea != null) {
            this.playerBardo.separate(pelea, this.arek.position);
            this.playerBardo.getPlayerHurt(this.arekDamage / 5);
            this.HPbar.destroy();
            this.HPbar = new HealthBar("HealthBar", (275 * ((this.playerBardo.currentHealth) / 100)), 25);
            this.addChild(this.HPbar);
            if (this.playerBardo.currentHealth <= 0) {
                this.world.removeChild(this.playerBardo);
                this.gameOver = true;
            }
        }

        // TOMANDO MI POCION
        for (let potion of this.potions) {
            const overlap = checkCollision(this.playerBardo, potion);
            if (overlap != null) {
                console.log("tomé la poción")
                sound.play("PotionSound1");


                potion.destroy();
                this.playerBardo.drinkPotion(50);

                this.HPbar.destroy();
                this.HPbar = new HealthBar("HealthBar", (275 * ((this.playerBardo.currentHealth) / 100)), 25);
                this.addChild(this.HPbar);
            }
        }

        // ARMA DE CUERPO A CUERPO Y ENEMIGO
        const pelea2 = checkCollision(this.melee, this.arek);
        if (pelea2 != null) {
            console.log("che deberia estar pegandole al arek")
            if ((this.causingDamage || Keyboard.state.get("KeyJ"))) {
                this.arek.getEnemyHurt(this.punchDamage);
                this.HPbar2.destroy();
                this.HPbar2 = new HealthBar("HealthBar", (100 * ((this.arek.currentHealth) / 100)), 10);
                this.HPbar2.position.set(-120, -145);
                this.arek.addChild(this.HPbar2);
                if (this.arek.currentHealth <= 0) {
                    this.world.removeChild(this.arek);
                }
            }
        }

        // ATAQUE DEL ENEMIGO AL JUGADOR
        const pelea3 = checkCollision(this.melee2, this.playerBardo);
        if (pelea3 != null) {
            this.arek.attackArek();
            this.playerBardo.getPlayerHurt(this.arekDamage);
            this.HPbar.destroy();
            this.HPbar = new HealthBar("HealthBar", (275 * ((this.playerBardo.currentHealth) / 100)), 25);
            this.addChild(this.HPbar);
            if (this.playerBardo.currentHealth <= 0) {
                this.world.removeChild(this.playerBardo);
                this.gameOver = true;
            }
        }
        else { this.arek.idleArek(); }

        // ATAQUE DEL JUGADOR A LARGA DISTANCIA HACIA EL ENEMIGO
        const pelea4 = checkCollision(this.range, this.arek);
        if (pelea4 != null) {
            if ((this.causingRangeDamage || Keyboard.state.get("KeyK"))) {
                this.arek.getEnemyHurt(this.rangeDamage);
                this.HPbar2.destroy();
                this.HPbar2 = new HealthBar("HealthBar", (100 * ((this.arek.currentHealth) / 100)), 10);
                this.HPbar2.position.set(-120, -145);
                this.arek.addChild(this.HPbar2);
                if (this.arek.currentHealth <= 0) {
                    this.world.removeChild(this.arek);
                }
            }
        }

        // FIN DE LA PANTALLA - CHESTBOX
        const fin = checkCollision(this.playerBardo, this.chest);
        if (fin != null) {
            this.chest.destroy();
            console.log("gane");      
            this.addChild(this.win);
            if (Keyboard.state.get("KeyM")) {
                console.log("openingBox");
                sound.stop("GameBGM");
                sound.stop("PotionSound1");
                this.win.onBoxClick();
                const winbgm=sound.find("ItemBGM");
                winbgm.volume=0.2;
                winbgm.play();
                this.Waiting();
            }
            
        }
    }

    private Waiting(): void {
        console.log("waiting");  
        new Tween(this.win).to({}, 6000).start().onComplete(this.NextStage.bind(this));
        
    }

    public NextStage(): void {
        console.log("next stage");
        this.nextStage = true;
        sound.stop("ItemBGM");
        SceneManager.changeScene(new MapScene2());
    }

    // TWEENS DE LOS MOVIMIENTOS DE AREK

    private arekToLeft(): void {
        this.arek.scale.set(2, 2);
        new Tween(this.arek)
            .from({ x: 4000 })
            .to({ x: 3700 }, 3000)
            .start()
            .onComplete(this.arekIdleRight.bind(this));

    }
    private arekIdleLeft(): void {
        new Tween(this.arek.idleArek)
            .from({ x: 3700 })
            .to({ x: 3700 }, 3000)
            .start()
            .onComplete(this.arekToLeft.bind(this));
    }
    private arekIdleRight(): void {
        new Tween(this.arek.idleArek)
            .from({ x: 3800 })
            .to({ x: 3800 }, 3000)
            .start()
            .onComplete(this.arekToRight.bind(this));
    }
    private arekToRight(): void {
        this.arek.scale.set(-2, 2);
        new Tween(this.arek)
            .from({ x: 3600 })
            .to({ x: 3900 }, 3000)
            .start()
            .onComplete(this.arekIdleLeft.bind(this));
    }

    // BOTON DE PAUSE

    private onPause(): void {
        // console.log("Pusimos pausa", this);
        this.isPaused = true;
        this.pauseScene = new PauseScene();
        this.removeChild(this.start,
            this.buttonA,
            this.buttonB,
            this.moveUp,
            this.moveDown,
            this.moveLeft,
            this.moveRight
        );
        this.addChild(this.pauseScene,
            this.pauseOff, this.config);
    }
    private offPause(): void {
        this.isPaused = false;
        this.removeChild(this.pauseScene,
            this.pauseOff, this.config);
        this.addChild(this.start,
            this.buttonA,
            this.buttonB,
            this.moveUp,
            this.moveDown,
            this.moveLeft,
            this.moveRight
        );
    }


    // BOTONES ON - OFF

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

    private onConfigClick(): void {
        SceneManager.changeScene(new Config());
        sound.stop("GameBGM");
    }


    private onButtonB(): void {
        this.playerBardo.punchRun();
        this.causingRangeDamage = true;
    }

    private onButtonA(): void {
        this.playerBardo.punch();
        this.causingDamage = true;
    }
    private habilityClick(): void {
        this.playerBardo.jump();
        this.winStage=true;
    }

    private RightMove(): void {
        this.playerBardo.runRight();
    }

    private LeftMove(): void {
        this.playerBardo.runLeft();
    }

    private DownMove(): void {
        this.playerBardo.crawl();

    }

    private UpMove(): void {
        this.playerBardo.jump();
    }

    private Stop(): void {
        this.playerBardo.idlePlayer();
        this.causingRangeDamage = false;
        this.causingDamage = false;
    }
}