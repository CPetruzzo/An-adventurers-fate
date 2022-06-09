import { sound } from "@pixi/sound";
import { Container, Texture, TilingSprite } from "pixi.js";
import { ChangeScene, HEIGHT, WIDTH } from "..";
import { checkCollision } from "../games/IHitBox";
import { Platform } from "../games/Platform";
import { Player } from "../games/Player";
import { GenericPanel } from "../ui/GenericPanel";
import { PointButton } from "../ui/PointButton";
import { ToggleButton } from "../ui/ToggleButton";
import { IUpdateable } from "../utils/IUpdateable";
import { Config } from "./Config";
import { GameOverScene } from "./GameOverScene";
import { PauseScene } from "./PauseScene";

export class GameScene extends Container implements IUpdateable {

    private playerBardo: Player;
    private world: Container;
    public numero:number =0;
    private backgrounds: TilingSprite[];
    gameOver: boolean = false;
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


    constructor() {
        super();
        this.backgrounds=[];

        this.world = new Container();

        const BGM = sound.find("GameBGM");
        BGM.play({loop:true, volume:0.05})      

        // FONDOS
        for (let i=1; i<6; i++){
            const background = new TilingSprite(
                Texture.from("B"+i),
                1280,
                720
            );
            this.addChild(background);
            this.backgrounds.push(background);
        }

        // UN JUGADOR
        this.playerBardo = new Player();
        this.playerBardo.scale.set(2);
        this.playerBardo.position.y=450;
        this.world.addChild(this.playerBardo);

        this.addChild(this.world);

        // LA PLATAFORMA PARA PISAR
        this.platforms = [];
        const plat1 = new Platform();
            plat1.scale.x=5.2;
            plat1.scale.y=1.5;
            plat1.position.x = 300;
            plat1.position.y = 700;

        const plat2 = new Platform();
            plat2.scale.x=0.5
            plat2.position.x = 600;
            plat2.position.y = 475;
        const plat3 = new Platform();
            plat3.scale.x=0.5
            plat3.position.x = 760;
            plat3.position.y = 250;
        const plat4 = new Platform();
            plat4.scale.x=0.5
            plat4.position.x = 1400;
            plat4.position.y = 150;
        const plat5 = new Platform();
            plat5.scale.x=5.2;
            plat5.scale.y=1.5;
            plat5.position.x = 2500;
            plat5.position.y = 700;
        const plat6 = new Platform();
            plat6.scale.x=0.5
            plat6.position.x = 2800;
            plat6.position.y = 677;
        const plat7 = new Platform();
            plat7.scale.x=0.5
            plat7.position.x = 2805;
            plat7.position.y = 675;
        const plat8 = new Platform();
            plat8.scale.x=0.5
            plat8.position.x = 2815;
            plat8.position.y = 677;
            
            this.world.addChild(plat1, plat2, plat3, plat4, plat5, plat6, plat7, plat8);
            this.platforms.push(plat1, plat2, plat3, plat4, plat5, plat6, plat7, plat8);

        //Habillity Circle
        this.cartel= new GenericPanel("lineDark02.png",35,35,35,35);
        this.cartel.position.set(1050,500);
        
        //Container para HealthBar
        this.barra= new GenericPanel("lineDark03.png",80,80,80,80);
        this.barra.scale.x=2
        this.barra.scale.y=0.4
        this.barra.position.set(10,10);
        this.addChild(this.barra);

        { /* Habillity */
        this.start=new PointButton(Texture.from("lineDark44.png"), 
        Texture.from("lineLight47.png"), 
        Texture.from("lineDark44.png"));
        this.start.x = this.cartel.x+80 
        this.start.y = this.cartel.y+80
        this.start.scale.x=1.2;
        this.start.scale.y=1.2;
        this.start.on("pointer down", this.habilityClick, this)
        this.start.on("pointerClick", this.Stop, this)
        }

        { /* A Button */
        this.buttonA=new PointButton(Texture.from("lineDark31.png"), 
        Texture.from("lineLight34.png"), 
        Texture.from("lineDark31.png"));
        this.buttonA.x = 980
        this.buttonA.y = 540
        this.buttonA.scale.x=1;
        this.buttonA.scale.y=1;
        this.buttonA.on("pointer down", this.onButtonA, this)
        this.buttonA.on("pointerClick", this.Stop, this)
        }

        { /* B Button */
        this.buttonB=new PointButton(Texture.from("lineDark32.png"), 
        Texture.from("lineLight35.png"), 
        Texture.from("lineDark32.png"));
        this.buttonB.x = 1120
        this.buttonB.y = 430
        this.buttonB.scale.x=1;
        this.buttonB.scale.y=1;
        this.buttonB.on("pointer down", this.onButtonB, this)
        this.buttonB.on("pointerClick", this.Stop, this)
        }

        { /* Move Up */
        this.moveUp=new PointButton(Texture.from("lineDark48.png"), 
        Texture.from("lineLight01.png"), 
        Texture.from("lineDark48.png"));
        this.moveUp.x = 160
        this.moveUp.y = 480
        this.moveUp.scale.x=1.5;
        this.moveUp.scale.y=1.5;
        this.moveUp.on("pointer down", this.UpMove, this)
        this.moveUp.on("pointerClick", this.Stop, this)
        }

        { /* Move Down */
        this.moveDown=new PointButton(Texture.from("lineDark05.png"), 
        Texture.from("lineLight08.png"), 
        Texture.from("lineDark05.png"));
        this.moveDown.x = 160
        this.moveDown.y = 620
        this.moveDown.scale.x=1.5;
        this.moveDown.scale.y=1.5;
        this.moveDown.on("pointer down", this.DownMove, this)
        this.moveDown.on("pointerClick", this.Stop, this)
        }
        { /* Move Left */
        this.moveLeft=new PointButton(Texture.from("lineDark00.png"), 
        Texture.from("lineLight03.png"), 
        Texture.from("lineDark00.png"));
        this.moveLeft.x = 100
        this.moveLeft.y = 550
        this.moveLeft.scale.x=1.5;
        this.moveLeft.scale.y=1.5;
        this.moveLeft.on("pointer down", this.LeftMove, this)
        this.moveLeft.on("pointerClick", this.Stop, this)
        }
        { /* Move Right */
        this.moveRight=new PointButton(Texture.from("lineDark01.png"), 
        Texture.from("lineLight04.png"), 
        Texture.from("lineDark01.png"));
        this.moveRight.x = 220
        this.moveRight.y = 550
        this.moveRight.scale.x=1.5;
        this.moveRight.scale.y=1.5;
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
        this.pauseOn=new PointButton(Texture.from("lineDark28.png"), 
        Texture.from("lineLight31.png"), 
        Texture.from("lineDark28.png"));
        this.pauseOn.x = 1230
        this.pauseOn.y = 40
        this.pauseOn.scale.x=1.45;
        this.pauseOn.scale.y=1.45;
        this.pauseOn.on("pointerClick", this.onPause, this)

        this.pauseOff=new PointButton(Texture.from("lineDark28.png"),
        Texture.from("lineLight31.png"),
        Texture.from("lineDark28.png"));
        this.pauseOff.x = 1230
        this.pauseOff.y = 40
        this.pauseOff.scale.x=1.45;
        this.pauseOff.scale.y=1.45;
        this.pauseOff.on("pointerClick", this.offPause, this)
        }

        { /* BUTTONS */
        this.buttonsOn=new PointButton(Texture.from("lineDark28.png"), 
        Texture.from("lineLight31.png"), 
        Texture.from("lineDark28.png"));
        this.buttonsOn.x = 1070
        this.buttonsOn.y = 40
        this.buttonsOn.scale.x=1.45;
        this.buttonsOn.scale.y=1.45;
        this.buttonsOn.on("pointerClick", this.removeButtons, this)

        this.buttonsOff=new PointButton(Texture.from("lineDark28.png"),
        Texture.from("lineLight31.png"),
        Texture.from("lineDark28.png"));
        this.buttonsOff.x = 1070
        this.buttonsOff.y = 40
        this.buttonsOff.scale.x=1.45;
        this.buttonsOff.scale.y=1.45;
        this.buttonsOff.on("pointerClick", this.showButtons, this)
        }

        this.config= new PointButton(Texture.from("CONFIG.png"),
        Texture.from("CONFIG hundido.png"),
        Texture.from("CONFIG.png"));
        this.config.x = 650
        this.config.y = 500
        this.config.scale.x=0.5;
        this.config.scale.y=0.5;
        this.config.on("pointerClick", this.onConfigClick, this)

        this.addChild(this.cartel);

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
    public update(deltaTime: number, _deltaFrame: number): void {
        if (this.gameOver) {
           ChangeScene(new GameOverScene());
           sound.stop("GameBGM");
        const GameOverBGM = sound.find("PartingBGM");
           GameOverBGM.play({loop:true, volume:0.05})

        }
        this.playerBardo.update(deltaTime); //updateAnimation
        

        // PARALLAX
        for (let i = 0; i < this.backgrounds.length; i++) {
			const background = this.backgrounds[i];
			const factor = (i / 6);
            if (this.playerBardo.x<0){
                background.tilePosition.x = background.tilePosition.x;
            }
            else 
            {
            background.tilePosition.x -= factor * this.playerBardo.speed.x/50;
            }
        }

        // LA COLISION PARA QUE TENGA SU FISICA Y NO CAIGA A TRAVES DE LAS PLATAFORMAS
        for (let platform of this.platforms) {
            const overlap = checkCollision(this.playerBardo, platform);
            if (overlap != null) {
                this.playerBardo.separate(overlap, platform.position);
            }
        }


    // LIMITES DE LA PANTALLA
        {
    // LIMITES HORIZONTALES //
        // LIMITE DERECHO
            // if (this.playerBardo.x > ((2 * WIDTH) - 100)) {
            //     this.playerBardo.x = (2 * WIDTH) - 100;
                
            //     this.playerBardo.scale.set(-0.5,0.5);


            // }
        // LIMITE IZQUIERDO 
            if (this.playerBardo.x < 0) {
                this.playerBardo.x = 0;
                this.world.x=0;
                this.playerBardo.scale.set(-2,2);
            }

    // LIMITES VERTICALES //
        // LIMITE INFERIOR
            if (this.playerBardo.y > (HEIGHT )) {
                this.playerBardo.y = (HEIGHT );
                this.playerBardo.canJump = true;
                this.gameOver = true;
            }
        }

        // CAMARA SEGUÍ A MI PERSONAJE
        {
            (this.world.x = - this.playerBardo.x * this.worldTransform.a + WIDTH / 3)
        }

    }

    private onPause(): void {
        console.log("Pusimos pausa", this);
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
        console.log("Quitamos pausa", this);
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

    private removeButtons(): void {
        console.log("Quitamos botones", this);
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
        console.log("Mostramos botones", this);
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

    private onConfigClick(): void {
        console.log("Apreté Config", this);
        ChangeScene(new Config());
        sound.stop("GameBGM");
    }


    private onButtonB(): void {
        console.log("Presionando la tecla B", this);
        this.playerBardo.punchRun();
    }

    private onButtonA(): void {
        console.log("Presionando la tecla A", this);
        this.playerBardo.punch();
    }
    private habilityClick(): void {
        console.log("Usando la habilidad especial", this);
    }

    private RightMove(): void {
        console.log("Derecha", this);
        this.playerBardo.runRight();
    }
    
    private LeftMove(): void {
        console.log("Izquierda", this);
        this.playerBardo.runLeft();
    }

    private DownMove(): void {
        console.log("Abajo", this);
        this.playerBardo.crawl();
        
    }
    
    private UpMove(): void {
        console.log("Arriba", this);
        this.playerBardo.jump();
    }

    private Stop(): void {
        console.log("Detenido", this);
        this.playerBardo.idlePlayer();
    }

}
