import { Container, Graphics, IDestroyOptions, Sprite, Texture } from "pixi.js";
import { ChangeScene } from "..";
import { PointButton } from "../ui/PointButton";
import { IUpdateable } from "../utils/IUpdateable";
import { Keyboard } from "../utils/Keyboard";
import { GameScene } from "./GameScene";

export class MapScene extends Container implements IUpdateable {
    
    private map: Sprite;
    public minScale:number=1;
    public maxScale:number=0.5;
    private stageOne: PointButton;

    constructor() {

        super();

        this.map = new Sprite(Texture.from("Map1"));
        this.addChild(this.map);
        this.map.scale.set(1);
        this.map.position.set(0, -240);


        this.stageOne = new PointButton(Texture.from("lineLight26.png"),
            Texture.from("lineLight26.png"),
            Texture.from("lineLight26.png"));
        this.stageOne.x = 580
        this.stageOne.y = 490
        this.stageOne.scale.x = 0.8;
        this.stageOne.scale.y = 0.8;
        this.stageOne.on("pointerClick", this.onStageOneClick, this);
        this.addChild(this.stageOne);


        const pointOnMap = new Sprite(Texture.from("lineLight26.png"));
        this.map.addChild(pointOnMap);
        pointOnMap.scale.set(0.8);
        pointOnMap.position.set(250, 100);

        const pointOnMap2 = new Sprite(Texture.from("lineLight26.png"));
        this.map.addChild(pointOnMap2);
        pointOnMap2.scale.set(0.8);
        pointOnMap2.position.set(645, 150);

        const pointOnMap3 = new Sprite(Texture.from("lineLight26.png"));
        this.map.addChild(pointOnMap3);
        pointOnMap3.scale.set(0.8);
        pointOnMap3.position.set(990, 400);

        const pointOnMap4 = new Sprite(Texture.from("lineLight26.png"));
        this.map.addChild(pointOnMap4);
        pointOnMap4.scale.set(0.8);
        pointOnMap4.position.set(70, 450);

 


        Keyboard.up.on("KeyW", this.moveMapUp, this);
        Keyboard.up.on("KeyS", this.moveMapDown, this);
        Keyboard.up.on("KeyA", this.moveLeft, this);
        Keyboard.up.on("KeyD", this.moveRight, this);
        Keyboard.up.on("KeyO", this.zoomOut, this);
        Keyboard.up.on("KeyI", this.zoomIn, this);

        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0, 0, 5);
        auxZero.endFill();
        this.addChild(auxZero);

        const auxUno = new Graphics();
        auxUno.beginFill(0xFF00FF);
        auxUno.drawCircle(1280, 960, 5);
        auxUno.endFill();
        this.addChild(auxUno);

    }
    
    public override destroy(options: boolean | IDestroyOptions | undefined) {
        super.destroy(options);

        Keyboard.up.off("KeyW", this.moveMapUp, this);
        Keyboard.up.off("KeyS", this.moveMapDown, this);
        Keyboard.up.off("KeyA", this.moveLeft, this);
        Keyboard.up.off("KeyD", this.moveRight, this);
        Keyboard.up.off("KeyO", this.zoomOut, this);
        Keyboard.up.off("KeyI", this.zoomIn, this);
    }
    public update(_deltaTime: number, _deltaFrame: number): void {
        // console.log(this.position.x, this.position.y);
        
        // LIMITES DE MOVIMIENTO DEL MAPA

        
        if (this.scale.x < this.minScale) {
            this.scale.x = this.minScale;
            this.scale.y = this.minScale;
        } 

        if (this.position.x > 0) {
            this.position.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
        }
        if (this.position.y > 240) {
            this.position.y = 240;
        }

    }

    private moveLeft() {
        this.position.x += 10;
        
    }
    private moveRight() {
        this.position.x -= 10;
    }
    private moveMapUp() {
        this.position.y += 10;
     
    }
    private moveMapDown() {
        this.position.y -= 10;
    }

    private zoomOut() {
        this.scale.x -= 0.1;
        this.scale.y -= 0.1;     
    }
    private zoomIn() {
        this.scale.x += 0.1;
        this.scale.y += 0.1;
    }

    private onStageOneClick() {
        ChangeScene(new GameScene());
    }

}