import { sound } from "@pixi/sound";
import { Container, Graphics, IDestroyOptions, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { PointButton } from "../ui/PointButton";
import { IUpdateable } from "../utils/IUpdateable";
import { Keyboard } from "../utils/Keyboard";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameScene } from "./GameScene";
import { GameStartScene } from "./GameStartScene";
import { MapScene } from "./MapScene";
// import { GameScene } from "./GameScene";


const RED = 0xAA0000;

export class MapScene2 extends SceneBase implements IUpdateable {

    private book: PointButton;
    // private soundOnOff: PointButton;
    private menuBag: PointButton;
    private graphicRed: Graphics;
    private map: Sprite;
    public minScale: number = 1;
    public maxScale: number = 0.5;
    private stageOne: PointButton;
    private world: Container;
    private infoText: Text;
    public currentHeight: number = SceneManager.HEIGHT;
    private bookOpened: Sprite;
    private closeBook: PointButton;
    private cartel: Sprite;
    private shield: PointButton;
    private button1: PointButton;
    private button2: PointButton;
    private buttonClose: PointButton;
    private backMenu: PointButton;
    private textoViejo!: Text;
    private Hp: Text;
    private PStrenght: Text;
    private BStrenght: Text;
    private player: Sprite;
    private marcoTopLeft: Sprite;
    public texto!: string | null;
    private stageTwo: PointButton;


    constructor() {

        super();

        this.world = new Container();
        this.addChild(this.world);

        const Tangerine = new TextStyle({ fontFamily: "Tangerine", fontSize: 48, fill: 0X1819 });

        this.map = new Sprite(Texture.from("Map1"));
        this.world.addChild(this.map);
        this.map.scale.set(1);
        this.map.position.set(0, -240);

        this.graphicRed = new Graphics();
        this.graphicRed.lineStyle({ color: RED, width: 10 });
        this.graphicRed.beginFill(RED, 0.3);
        this.graphicRed.drawRect(-50, -50, 50, 50);
        this.world.addChild(this.graphicRed);

        this.stageOne = new PointButton(Texture.from("lineDark23.png"),
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

        this.stageTwo = new PointButton(Texture.from("lineDark23.png"),
            Texture.from("lineLight26.png"),
            Texture.from("lineLight26.png"));
        this.stageTwo.x = 70;
        this.stageTwo.y = 450;
        this.stageTwo.scale.x = 0.8;
        this.stageTwo.scale.y = 0.8;
        this.stageTwo.on("pointerClick", this.onStageTwoClick, this);
        this.map.addChild(this.stageTwo);

        Keyboard.down.on("NumpadAdd", () => this.world.scale.set(this.world.scale.x + 0.1));
        Keyboard.down.on("NumpadSubtract", () => this.world.scale.set(this.world.scale.x - 0.1));


        this.infoText = new Text("", Tangerine);
        // this.addChild(this.infoText);


        this.book = new PointButton(Texture.from("BookOff"),
            Texture.from("Book"),
            Texture.from("Book"));
        this.book.scale.set(0.3);
        this.book.x = 380;
        this.book.y = 650;
        this.book.on("pointerClick", this.onBook, this);
        this.addChild(this.book);

        this.shield = new PointButton(Texture.from("ShieldOff"),
            Texture.from("Shield"),
            Texture.from("Shield"));
        this.shield.scale.set(0.25);
        this.shield.x = 240;
        this.shield.y = 640;
        this.shield.on("pointerClick", this.onShieldClick, this);
        this.addChild(this.shield);

        this.menuBag = new PointButton(Texture.from("BagOff"),
            Texture.from("Bag"),
            Texture.from("Bag"));
        this.menuBag.scale.set(-0.3, 0.3);
        this.menuBag.x = 100;
        this.menuBag.y = 650;
        this.menuBag.on("pointerClick", this.onMenuBagClick, this);
        this.addChild(this.menuBag);


        // OPEN BOOK

        this.bookOpened = Sprite.from("BookOpened");
        this.bookOpened.x = 150;
        this.bookOpened.y = 50;
        this.bookOpened.scale.set(0.7);

        this.closeBook = new PointButton(Texture.from("lineDark30.png"),
            Texture.from("lineDark30.png"),
            Texture.from("lineDark30.png"));
        this.closeBook.x = 1020;
        this.closeBook.y = 150;
        this.closeBook.on("pointerClick", this.onBookClose, this)


        // DATOS DEL JUGADOR

        this.backMenu = new PointButton(Texture.from("backToMenu"),
            Texture.from("backToMenu"),
            Texture.from("backToMenu"));
        this.backMenu.x = 1170;
        this.backMenu.y = 50;
        this.backMenu.scale.set(0.8);
        this.backMenu.on("pointerClick", this.onBackMenu, this);
        this.addChild(this.backMenu);

        this.cartel = Sprite.from("Cartel");
        this.cartel.x = 470;
        this.cartel.y = 200;

        this.button1 = new PointButton(Texture.from("MapButtonOff"),
            Texture.from("MapButton"),
            Texture.from("MapButton"));
        this.button1.x = 630
        this.button1.y = 420
        this.button1.scale.x = 0.8;
        this.button1.scale.y = 0.8;
        this.button1.on("pointerClick", this.onMenu, this);

        this.button2 = new PointButton(Texture.from("MapButtonOff"),
            Texture.from("MapButton"),
            Texture.from("MapButton"));
        this.button2.x = 630;
        this.button2.y = 350;
        this.button2.scale.set(0.8)
        this.button2.on("pointerClick", this.onStageOneClick, this)

        this.buttonClose = new PointButton(Texture.from("ButtonClose"),
            Texture.from("ButtonClose"),
            Texture.from("ButtonClose"));
        this.buttonClose.position.set(755, 225);
        this.buttonClose.scale.set(0.8);
        this.buttonClose.on("pointerClick", this.onCloseClick, this)



        this.textoViejo = new Text("Nombre: " + MapScene.texto, Tangerine);

        const mapMsc = sound.find("MapBGM");
        mapMsc.play({ loop: true, volume: 0.05 })
        this.textoViejo.x = 250;
        this.textoViejo.y = 120;


        this.Hp = new Text("Max hp: 100", Tangerine);
        this.Hp.position.set(320, 270);
        this.PStrenght = new Text("Punch: 5 hp", Tangerine);
        this.PStrenght.position.set(320, 320);
        this.BStrenght = new Text("Bow: 2 hp", Tangerine);
        this.BStrenght.position.set(320, 370);

        this.player = Sprite.from("PlayerMap");
        this.player.scale.set(0.45);
        this.player.position.set(530, 80);

        this.marcoTopLeft = Sprite.from("MarcoMap");
        this.marcoTopLeft.scale.set(-0.4, 0.4);
        this.marcoTopLeft.position.set(400, 200);
    }

    onShieldClick(): void {
        throw new Error("Method not implemented.");
    }

    onCloseClick(): void {
        this.removeChild(this.buttonClose);
        this.removeChild(this.cartel);
        this.removeChild(this.button1);
        this.removeChild(this.button2);
        this.addChild(this.backMenu);
    }

    private onMenuBagClick(): void {
        throw new Error("Method not implemented.");
    }

    private onBackMenu(): void {
        this.removeChild(this.backMenu);
        this.addChild(this.cartel);
        this.addChild(this.button1);
        this.addChild(this.button2);
        this.addChild(this.buttonClose);
    }

    private onBook(): void {
        this.addChild(this.bookOpened,
            this.closeBook,
            this.textoViejo,
            this.player,
            this.Hp,
            this.PStrenght,
            this.BStrenght,
            this.marcoTopLeft);

        this.removeChild(this.book);
    }

    onBookClose() {
        this.removeChild(this.bookOpened,
            this.closeBook,
            this.textoViejo,
            this.Hp,
            this.PStrenght,
            this.BStrenght,
            this.player);

        this.addChild(this.book);
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
        if (this.world.scale.x == this.minScale) {
            this.world.position.x = 0;
        }
        if (this.world.scale.x == this.minScale + 0.1) {
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

    // Faltaría hacer una pantalla 2
    private onStageTwoClick() {
        sound.stop("MapBGM");
        SceneManager.changeScene(new GameScene());
    }

    private onMenu() {
        sound.stop("MapBGM");
        SceneManager.changeScene(new GameStartScene());
    }
}