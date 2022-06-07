import { Container, Texture } from "pixi.js";
import { GenericPanel } from "../ui/GenericPanel";
import { PointButton } from "../ui/PointButton";
import { ToggleButton } from "../ui/ToggleButton";

export class Scene extends Container{
    
    private cartel: GenericPanel;
 
    private start: PointButton;
    private buttonA: PointButton;
    private buttonB: PointButton;
    private buttonSound: ToggleButton;
    private moveUp: PointButton;
    private moveDown: PointButton;
    private moveLeft: PointButton;
    private moveRight: PointButton;
    private pause: PointButton;
    private barra: GenericPanel;

    constructor() {
        super();

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
        this.start.on("pointerClick", this.habilityClick, this)
        }

        { /* A Button */
        this.buttonA=new PointButton(Texture.from("lineDark31.png"), 
        Texture.from("lineLight34.png"), 
        Texture.from("lineDark31.png"));
        this.buttonA.x = 980
        this.buttonA.y = 540
        this.buttonA.scale.x=1;
        this.buttonA.scale.y=1;
        this.buttonA.on("pointerClick", this.onButtonA, this)
        }

        { /* B Button */
        this.buttonB=new PointButton(Texture.from("lineDark32.png"), 
        Texture.from("lineLight35.png"), 
        Texture.from("lineDark32.png"));
        this.buttonB.x = 1120
        this.buttonB.y = 430
        this.buttonB.scale.x=1;
        this.buttonB.scale.y=1;
        this.buttonB.on("pointerClick", this.onButtonB, this)
        }

        { /* Move Up */
        this.moveUp=new PointButton(Texture.from("lineDark48.png"), 
        Texture.from("lineLight01.png"), 
        Texture.from("lineDark48.png"));
        this.moveUp.x = 160
        this.moveUp.y = 480
        this.moveUp.scale.x=1.5;
        this.moveUp.scale.y=1.5;
        this.moveUp.on("pointerClick", this.UpMove, this)
        }

        { /* Move Down */
        this.moveDown=new PointButton(Texture.from("lineDark05.png"), 
        Texture.from("lineLight08.png"), 
        Texture.from("lineDark05.png"));
        this.moveDown.x = 160
        this.moveDown.y = 620
        this.moveDown.scale.x=1.5;
        this.moveDown.scale.y=1.5;
        this.moveDown.on("pointerClick", this.DownMove, this)
        }
        { /* Move Left */
        this.moveLeft=new PointButton(Texture.from("lineDark00.png"), 
        Texture.from("lineLight03.png"), 
        Texture.from("lineDark00.png"));
        this.moveLeft.x = 100
        this.moveLeft.y = 550
        this.moveLeft.scale.x=1.5;
        this.moveLeft.scale.y=1.5;
        this.moveLeft.on("pointerClick", this.LeftMove, this)
        }
        { /* Move Right */
        this.moveRight=new PointButton(Texture.from("lineDark01.png"), 
        Texture.from("lineLight04.png"), 
        Texture.from("lineDark01.png"));
        this.moveRight.x = 220
        this.moveRight.y = 550
        this.moveRight.scale.x=1.5;
        this.moveRight.scale.y=1.5;
        this.moveRight.on("pointerClick", this.RightMove, this)
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
        this.pause=new PointButton(Texture.from("lineDark28.png"), 
        Texture.from("lineLight31.png"), 
        Texture.from("lineDark28.png"));
        this.pause.x = 1230
        this.pause.y = 40
        this.pause.scale.x=1.45;
        this.pause.scale.y=1.45;
        this.pause.on("pointerClick", this.onPause, this)
        }

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
            this.pause,
            )
    }

    update(_deltaTime: number) {
        throw new Error("Method not implemented.");
    }
    
    private onPause(): void {
        console.log("Pusimos pausa", this);
    }
    private onButtonB(): void {
        console.log("Presionando la tecla B", this);
    }
    private onButtonA(): void {
        console.log("Presionando la tecla A", this);
    }
    private habilityClick(): void {
        console.log("Usando la habilidad especial", this);
    }
    private RightMove(): void {
        console.log("Derecha", this);
    }
    private LeftMove(): void {
        console.log("Izquierda", this);
    }
    private DownMove(): void {
        console.log("Abajo", this);
    }
    private UpMove(): void {
        console.log("Arriba", this);
    }
}

