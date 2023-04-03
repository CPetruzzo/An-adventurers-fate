import { Container, Point, Sprite, Text, Texture } from "pixi.js";
import { PointButton } from "./PointButton";
import { GenericPanel } from "./GenericPanel";
import { HealthBar } from "../games/HealthBar";
import { START_SCALE, BUTTON_SCALE, MOVEMENTS_SCALE, UI_SCALE, UI_CONFIG } from "../utils/constants";
import { ToggleButton } from "./ToggleButton";
import { sound } from "@pixi/sound";
import { SceneManager } from "../utils/SceneManager";
import { Config } from "../scenes/Config";
import { PauseScene } from "../scenes/PauseScene";
import { Arek } from "../games/Enemies/Arek";

export class SceneUI extends Container {
    public cartel: GenericPanel;
    public aljava: Sprite;
    public playerBardo: any;
    public arrowsOnScreen: Text;
    public start: PointButton;
    public buttonA: PointButton;
    public buttonB: PointButton;
    public moveUp: PointButton;
    public moveDown: PointButton;
    public moveLeft: PointButton;
    public moveRight: PointButton;
    public buttonSound: ToggleButton;
    public pauseOn: PointButton;
    public pauseOff: PointButton;
    public buttonsOn: PointButton;
    public buttonsOff: PointButton;
    public config: PointButton;
    public HPbar: HealthBar;
    public barra: GenericPanel;
    public HPbar2: HealthBar;
    public pauseScene: PauseScene;
    public causingRangeDamage: boolean = false;
    public causingDamage: boolean = false;
    public winStage: boolean = false;

    constructor(arek: Arek) {
        super();

        //Habillity Circle
        this.cartel = new GenericPanel("lineDark02.png", 35, 35, 35, 35);
        this.cartel.position.set(1050, 500);

        this.aljava = Sprite.from("aljava");
        this.aljava.position.set(400, 40);
        this.aljava.scale.set(0.1);
        this.aljava.anchor.set(0.5);
        this.addChild(this.aljava);

        let arrowsAvailable = this.playerBardo.arrowsAvailable;
        this.arrowsOnScreen = new Text(`${arrowsAvailable}`, { fontSize: 20, fontFamily: ("Arial") });
        this.arrowsOnScreen.position.set(400, 55)
        this.addChild(this.arrowsOnScreen);

        // Contador de flechas en pantalla
        this.on("changeArrowAmount", () => {
            this.removeChild(this.arrowsOnScreen);
            let arrowsAvailable = this.playerBardo.arrowsAvailable;
            this.arrowsOnScreen = new Text(`${arrowsAvailable}`, { fontSize: 20, fontFamily: ("Arial") });
            this.arrowsOnScreen.position.set(400, 55)
            this.addChild(this.arrowsOnScreen);
        });

        this.start = this.createPointButton(
            "lineDark44.png",
            "lineLight47.png",
            this.cartel.x + 80,
            this.cartel.y + 80,
            START_SCALE
        );
        this.start.on("pointer down", this.habilityClick, this);

        this.buttonA = this.createPointButton(
            "lineDark31.png",
            "lineLight34.png",
            980,
            540,
            BUTTON_SCALE
        );
        this.buttonA.on("pointer down", this.onButtonA, this)
        this.buttonA.on("pointerClick", this.Stop, this);

        this.buttonB = this.createPointButton(
            "lineDark32.png",
            "lineDark32.png",
            1120,
            430,
            BUTTON_SCALE
        );
        this.buttonB.on("pointer down", this.onButtonB, this)
        this.buttonB.on("pointerClick", this.Stop, this);

        this.moveUp = this.createPointButton(
            "lineDark48.png",
            "lineLight01.png",
            180,
            440,
            MOVEMENTS_SCALE
        );
        this.moveUp.on("pointer down", this.UpMove, this)

        this.moveDown = this.createPointButton(
            "lineDark05.png",
            "lineLight08.png",
            180,
            620,
            MOVEMENTS_SCALE
        );
        this.moveDown.on("pointer down", this.DownMove, this)
        this.moveDown.on("pointerClick", this.Stop, this)

        this.moveLeft = this.createPointButton(
            "lineDark00.png",
            "lineLight03.png",
            100,
            530,
            MOVEMENTS_SCALE
        );
        this.moveLeft.on("pointer down", this.LeftMove, this)
        this.moveLeft.on("pointerClick", this.Stop, this)

        this.moveRight = this.createPointButton(
            "lineDark01.png",
            "lineLight04.png",
            260,
            530,
            MOVEMENTS_SCALE
        );
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

        this.pauseOn = this.createPointButton(
            "lineDark28.png", 
            "lineLight31.png", 
            1230, 
            40, 
            UI_SCALE
            );
        this.pauseOn.on("pointerClick", this.onPause, this)

        this.pauseOff = this.createPointButton(
            "lineDark28.png", 
            "lineLight31.png", 
            1230, 
            40, 
            UI_SCALE
            );
        this.pauseOff.on("pointerClick", this.offPause, this)

        this.buttonsOn = this.createPointButton(
            "lineDark28.png", 
            "lineLight31.png", 
            1070, 
            40, 
            UI_SCALE
            );
        this.buttonsOn.on("pointerClick", this.removeButtons, this);

        this.buttonsOff = this.createPointButton(
            "lineDark28.png", 
            "lineLight31.png", 
            1070, 
            40, 
            UI_SCALE
            );
        this.buttonsOff.on("pointerClick", this.showButtons, this)

        this.config = this.createPointButton(
            "CONFIG.png", 
            "CONFIG hundido.png", 
            650, 
            500, 
            UI_CONFIG
            );
        this.config.on("pointerClick", this.onConfigClick, this)

        this.HPbar = new HealthBar("HealthBar", (250 * ((this.playerBardo.currentHealth) / 100)), 60);
        this.HPbar.position.set(0, -20);
        this.addChild(this.HPbar);
        this.barra = new GenericPanel("hpFrame2", 40, 40, 40, 40);
        this.barra.position.set(-10, -77);
        this.addChild(this.barra);

        this.HPbar2 = new HealthBar("HealthBar", (100 * ((arek.currentHealth) / 100)), 10);
        this.HPbar2.position.set(-120, -145);
        arek.addChild(this.HPbar2);

        this.pauseScene = new PauseScene();
    }


    // BOTON DE PAUSE
    private onPause(): void {
        this.emit("isPaused");
        this.removeChild(
            this.start,
            this.buttonA,
            this.buttonB,
            this.moveUp,
            this.moveDown,
            this.moveLeft,
            this.moveRight
        );
        this.addChild(
            this.pauseScene,
            this.pauseOff,
        );
    }

    private offPause(): void {
        this.emit("notPaused");
        this.removeChild(
            this.pauseScene,
            this.pauseOff,
        );
        this.addChild(
            this.start,
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
        this.playerBardo.bow();
        this.causingRangeDamage = true;
    }

    private onButtonA(): void {
        this.playerBardo.punch();
        this.causingDamage = true;
        sound.stop("bow");
    }
    private habilityClick(): void {
        this.playerBardo.jump();
        this.winStage = true;
        sound.stop("running");
        sound.stop("bow");
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
        sound.stop("running");

    }

    private Stop(): void {
        this.playerBardo.idlePlayer();
        sound.stop("running");
        sound.stop("bow");
        this.causingRangeDamage = false;
        this.causingDamage = false;
    }

    // Use a function to create PointButtons with common parameters
    public createPointButton(textureName: string, textureClickName: string, x: number, y: number, scale: number): PointButton {
        return new PointButton(Texture.from(textureName), Texture.from(textureClickName), Texture.from(textureName), new Point(x, y), scale)
    }
}