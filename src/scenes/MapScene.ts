import { sound } from "@pixi/sound";
import { Container, Graphics, IDestroyOptions, Sprite, Text, Texture } from "pixi.js";
import { PointButton } from "../ui/PointButton";
import { IUpdateable } from "../utils/IUpdateable";
import { Keyboard } from "../utils/Keyboard";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameScene } from "./GameScene";
// import { GameScene } from "./GameScene";


const RED = 0xAA0000;

export class MapScene extends SceneBase implements IUpdateable {

    private graphicRed: Graphics;
    private map: Sprite;
    public minScale: number = 1;
    public maxScale: number = 0.5;
    private stageOne: PointButton;
    private world: Container;
    private infoText: Text;
    public currentHeight: number = SceneManager.HEIGHT;

    constructor() {

        super();

        const mapMsc = sound.find("MapBGM");
        mapMsc.play({ loop: true, volume: 0.05 })

        this.world = new Container();
        this.addChild(this.world);

        this.map = new Sprite(Texture.from("Map1"));
        this.world.addChild(this.map);
        this.map.scale.set(1);
        this.map.position.set(0, -240);

        this.graphicRed = new Graphics();
        this.graphicRed.lineStyle({ color: RED, width: 10 });
        this.graphicRed.beginFill(RED, 0.3);
        this.graphicRed.drawRect(-50, -50, 50, 50);
        this.world.addChild(this.graphicRed);

        this.stageOne = new PointButton(Texture.from("lineLight26.png"),
            Texture.from("lineLight26.png"),
            Texture.from("lineLight26.png"));
        this.stageOne.x = 580
        this.stageOne.y = 750
        this.stageOne.scale.x = 0.8;
        this.stageOne.scale.y = 0.8;
        this.stageOne.on("pointerClick", this.onStageOneClick, this);
        this.map.addChild(this.stageOne);

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

        Keyboard.down.on("NumpadAdd", () => this.world.scale.set(this.world.scale.x + 0.1));
        Keyboard.down.on("NumpadSubtract", () => this.world.scale.set(this.world.scale.x - 0.1));


        this.infoText = new Text("", { fontFamily: "Arial", fontSize: 48, fill: 0xFFFFFF });
        this.addChild(this.infoText);
    }

    public override destroy(options: boolean | IDestroyOptions | undefined) {
        super.destroy(options);
    }

    public update(_deltaFrame: number, deltaTime: number): void {

        this.infoText.text = "Player position inside the world: " +
            this.graphicRed.x.toFixed(1) + ", " + this.graphicRed.y.toFixed(1);


        if (Keyboard.state.get("ArrowRight")) {
            this.graphicRed.x += 0.1 * deltaTime;
            this.infoText.text += " ➡"
        }
        if (Keyboard.state.get("ArrowLeft")) {
            this.graphicRed.x -= 0.1 * deltaTime;
            this.infoText.text += " ⬅"
        }
        if (Keyboard.state.get("ArrowDown")) {
            this.graphicRed.y += 0.1 * deltaTime;
            this.infoText.text += " ⬇"
        }
        if (Keyboard.state.get("ArrowUp")) {
            this.graphicRed.y -= 0.1 * deltaTime;
            this.infoText.text += " ⬆"
        }

        this.infoText.text += "\nWorld position: " +
            this.world.x.toFixed(1) + ", " + this.world.y.toFixed(1)

        if (Keyboard.state.get("KeyD")) {
            this.world.x -= 0.1 * deltaTime;
            this.infoText.text += " ⬅"
        }
        if (Keyboard.state.get("KeyA")) {
            this.world.x += 0.1 * deltaTime;
            this.infoText.text += " ➡"
        }
        if (Keyboard.state.get("KeyS")) {
            this.world.y -= 0.1 * deltaTime;
            this.infoText.text += " ⬆"
        }
        if (Keyboard.state.get("KeyW")) {
            this.world.y += 0.1 * deltaTime;
            this.infoText.text += " ⬇"
        }


        // LIMITES DE MOVIMIENTO DEL MAPA


        if (this.world.scale.x === this.minScale) {
            this.world.scale.x = this.minScale;
            this.world.scale.y = this.minScale;
        }

        // LIMITE IZQUIERDO 
        if (this.world.position.x > 0) {
            this.world.position.x = 0;
        }
        if (this.world.scale.x==this.minScale) {
            this.world.position.x = 0;
        }
        if (this.world.scale.x==this.minScale+0.1)  {
            if (this.world.position.x < -128) {
                this.world.position.x = -128;
            }
        }
        // LIMITE INFERIOR
        if (this.world.y > 238) {
            this.world.y = 238
        }

        if (this.position.x > 0) {
            this.position.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.world.position.y < 0) {
            this.world.position.y = 0;
        }
        if (this.position.y > 240) {
            this.position.y = 240;
        }

    }

    private onStageOneClick() {
        sound.stop("MapBGM");
        SceneManager.changeScene(new GameScene());
        
    }

}