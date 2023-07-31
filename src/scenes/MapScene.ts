import { sound } from "@pixi/sound";
import { Container, DisplayObject, Graphics, IDestroyOptions, Sprite, Text } from "pixi.js";
import { Tween } from "tweedle.js";
import { IUpdateable } from "../utils/IUpdateable";
import { Keyboard } from "../utils/Keyboard";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameScene } from "./GameScene";
import { GameStartScene } from "./GameStartScene";
import { LETRA2 } from "../utils/constants";
import { backMenu, book, button1Params, button2Params, buttonCloseParams, closeBook, createPointButton, mapDownParams, mapUpParams, menuBag, shield, shieldCloseParams, stageFour, stageOne, stageThree, stageTwo } from "../utils/ButtonParams";
import { backShieldParams, bookOpenedParams, cartelParams, createSprite, itemBowParams, itemWeapon1Params, itemWeapon2Params, itemWeapon3Params, itemWeapon4Params, mapParams, marcoBottomRightParams, marcoTopLeftParams, nombreParams, pieParams, playerParams, pointOnMap2Params, pointOnMap3Params, pointOnMap4Params, pointOnMapParams } from "../utils/SpriteParams";
import { closePopUp, createPopUp } from "../utils/PopUps";
import { BStrenghtParams, HpParams, PStrenghtParams, createText, levelParams, salirNoParams, salirParams, salirSiParams } from "../utils/TextParams";
import { Level } from "../utils/Level";

const RED = 0xAA0000;

export class MapScene extends SceneBase implements IUpdateable {

    // private soundOnOff: PointButton;
    private graphicRed: Graphics;
    private map: Sprite;
    public minScale: number = 1;
    public maxScale: number = 0.5;
    private world: Container;
    private infoText: Text;
    public currentHeight: number = SceneManager.HEIGHT;
    private bookOpened: Sprite;
    private cartel: Sprite;
    private textoViejo!: Text;
    private Hp: Text;
    private PStrenght: Text;
    private BStrenght: Text;
    private player: Sprite;
    private marcoTopLeft: Sprite;
    static texto: string | null;
    private salir: Text;
    private salirSi: Text;
    private salirNo: Text;
    private marcoBottomRight: Sprite;
    private nombre: Sprite;
    private pie: Sprite;
    private backShield: Sprite;
    private itemWeapon4: Sprite;
    private itemWeapon1: Sprite;
    private itemWeapon2: Sprite;
    private itemWeapon3: Sprite;
    private level: Text;
    private itemBow: Sprite;
    private goingUp: boolean = false;
    private goingDown: boolean = false;
    private buttonRefs: any;
    private buttonsCloseBook: string[];
    public buttonsUI: string[];
    public buttonsMapUpDown: string[];
    private buttonsCloseShield: string[];
    private buttonsBackMenuClose: string[];
    private popUps: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][] } } = {};

    constructor() {
        super();

        this.world = new Container();
        this.addChild(this.world);

        this.map = createSprite(mapParams);
        this.world.addChild(this.map);

        this.graphicRed = new Graphics();
        this.graphicRed.lineStyle({ color: RED, width: 10 });
        this.graphicRed.beginFill(RED, 0.3);
        this.graphicRed.drawRect(-50, -50, 50, 50);
        // this.world.addChild(this.graphicRed);

        if (1 <= Level.Complete) {
            const stageOneButton = createPointButton(stageOne, "pointerClick", () => this.onStageOneClick());
            this.map.addChild(stageOneButton);
        }
        if (2 <= Level.Complete) {
            const stageTwoButton = createPointButton(stageTwo, "pointerClick", () => this.onStageTwoClick());
            this.map.addChild(stageTwoButton);
        }
        if (3 <= Level.Complete) {
            const stageThreeButton = createPointButton(stageThree, "pointerClick", () => this.onStageThreeClick());
            this.map.addChild(stageThreeButton);
        }
        if (4 <= Level.Complete) {
            const stageFourButton = createPointButton(stageFour, "pointerClick", () => this.onStageFourClick());
            this.map.addChild(stageFourButton);
        }

        const pointOnMap = createSprite(pointOnMapParams);
        const pointOnMap2 = createSprite(pointOnMap2Params);
        const pointOnMap3 = createSprite(pointOnMap3Params);
        const pointOnMap4 = createSprite(pointOnMap4Params);
        this.map.addChild(pointOnMap, pointOnMap2, pointOnMap3, pointOnMap4);

        this.nombre = createSprite(nombreParams);
        this.pie = createSprite(pieParams);
        this.backShield = createSprite(backShieldParams);
        this.bookOpened = createSprite(bookOpenedParams);
        this.cartel = createSprite(cartelParams);
        this.itemWeapon4 = createSprite(itemWeapon4Params);
        this.itemWeapon1 = createSprite(itemWeapon1Params);
        this.itemWeapon2 = createSprite(itemWeapon2Params);
        this.itemWeapon3 = createSprite(itemWeapon3Params);
        this.itemBow = createSprite(itemBowParams);
        this.player = createSprite(playerParams);
        this.marcoTopLeft = createSprite(marcoTopLeftParams);
        this.marcoBottomRight = createSprite(marcoBottomRightParams);
        this.nombre = createSprite(nombreParams);
        this.pie = createSprite(pieParams);

        this.infoText = new Text("", LETRA2);

        // ACA AGREGO TODO LO QUE QUIERO
        const buttonsConfig = [
            { ref: 'stageOne', params: stageOne, onClick: () => this.onStageOneClick() },
            { ref: 'book', params: book, onClick: () => this.onBook() },
            { ref: 'shield', params: shield, onClick: () => this.onShieldClick() },
            { ref: 'menuBag', params: menuBag, onClick: () => this.onMenuBagClick() },
            { ref: 'closeBook', params: closeBook, onClick: () => this.onBookClose() },
            { ref: 'backMenu', params: backMenu, onClick: () => this.onBackMenu() },
            { ref: 'button1', params: button1Params, onClick: () => this.onBackMenuClose() },
            { ref: 'button2', params: button2Params, onClick: () => this.onMenu() },
            { ref: 'MapUp', params: mapUpParams, onClick: () => this.stopMap() },
            { ref: 'MapDown', params: mapDownParams, onClick: () => this.stopMap() },
            { ref: 'buttonClose', params: buttonCloseParams, onClick: () => this.onBackMenuClose() },
            { ref: 'shieldClose', params: shieldCloseParams, onClick: () => this.onCloseShieldClick() },
        ];
        // ACA SEPARO/DECLARO GRUPOS, DEPENDE COMO QUIERA MANEJARLOS
        this.buttonsBackMenuClose = ['buttonClose', 'button2', 'button1'];
        this.buttonsCloseBook = ['closeBook'];
        this.buttonsCloseShield = ['shieldClose'];
        this.buttonsUI = ['book', 'shield', 'menuBag', 'backMenu'];
        this.buttonsMapUpDown = ['MapUp', 'MapDown'];
        // DECLARAMOS VACIO PRIMERO PARA QUE SE CREE
        this.buttonRefs = {};
        // SE CREA Y SE HACE ADDCHILD DE TODO (si, todo, si no tendría que pasar )
        this.buttonRefs = this.createButtons.call(this, buttonsConfig);
        // REMOVE CHILD DE LO QUE NO NECESITAMOS AHORA
        this.removeGroups([this.buttonsCloseBook, this.buttonsCloseShield, this.buttonsBackMenuClose], this.buttonRefs)

        // // NOMBRE DEL JUGADOR
        MapScene.texto = prompt("Introduce tu nombre");
        if (MapScene.texto != null || MapScene.texto === "") {
            this.textoViejo = new Text(MapScene.texto || "Jugador", LETRA2);
        } else {
            MapScene.texto = "Jugador";
            this.textoViejo = new Text(MapScene.texto, LETRA2);
        }
        this.textoViejo.x = 400 - (this.textoViejo.width / 2);
        this.textoViejo.y = 120;

        const mapMsc = sound.find("MapBGM");
        mapMsc.play({ loop: true, volume: 0.05 })

        this.Hp = createText(HpParams);
        this.PStrenght = createText(PStrenghtParams);
        this.BStrenght = createText(BStrenghtParams);
        this.salir = createText(salirParams);
        this.salirSi = createText(salirSiParams);
        this.salirNo = createText(salirNoParams);
        this.level = createText(levelParams);

        this.world.addChild(this.map);

        Keyboard.down.on("NumpadAdd", () => this.world.scale.set(this.world.scale.x + 0.1));
        Keyboard.down.on("NumpadSubtract", () => this.world.scale.set(this.world.scale.x - 0.1));
    }

    private createButtons(buttonsConfig: any) {
        buttonsConfig.forEach((buttonConfig: any) => {
            const { ref, params, onClick } = buttonConfig;
            this.buttonRefs[ref] = createPointButton(params, 'pointerClick', onClick);

            if (ref === 'MapUp') {
                this.buttonRefs[ref].on('pointer down', this.onMapUp.bind(this), this);
            }
            if (ref === 'MapDown') {
                this.buttonRefs[ref].on('pointer down', this.onMapDown.bind(this), this);
            }

            this.addChild(this.buttonRefs[ref]);
        });

        return this.buttonRefs;
    }

    // Ejemplo de uso en tus funciones
    private onShieldClick(): void {
        createPopUp("shield", [], [[this.backShield, this.buttonRefs['shieldClose'], this.itemWeapon4, this.itemWeapon3, this.itemWeapon2, this.itemWeapon1, this.itemWeapon1 && this.itemBow]], this, this.popUps)
    }
    private onCloseShieldClick(): void {
        closePopUp("shield", this, this.popUps); // Cerramos el pop-up 'shield'
    }

    private onBackMenu(): void {
        createPopUp("closeMenu", // Nombre del pop-up
            [[this.buttonRefs['backMenu']],], // objetos a remover
            [[this.cartel, this.salir, this.buttonRefs['button1'], this.buttonRefs['button2'],
            this.salirSi, this.salirNo, this.buttonRefs['buttonClose']]] // objetos a agregar
            , this, this.popUps)
    }
    private onBackMenuClose(): void {
        closePopUp("closeMenu", this, this.popUps); // Cerramos el pop-up 'closeMenu'
    }

    private onBook(): void {
        this.bookSound();
        createPopUp("book", // Nombre del pop-up
            [[this.buttonRefs['book']]],
            [[this.bookOpened, this.buttonRefs['closeBook'], this.textoViejo, this.player,
            this.Hp, this.PStrenght, this.BStrenght, this.marcoTopLeft,
            this.marcoBottomRight, this.nombre, this.pie, this.level]]
            , this, this.popUps);
    }
    private onBookClose(): void {
        closePopUp("book", this, this.popUps); // Cerramos el pop-up 'book'
    }

    private onMapUp(): void {
        this.goingUp = true;
    }
    private onMapDown(): void {
        this.goingDown = true;
    }

    public stopMap(): void {
        this.goingUp = false;
        this.goingDown = false;
    }

    private onMenuBagClick(): void {
        throw new Error("Method not implemented.");
    }

    private bookSound(): void {
        sound.play("SoundBook")
        new Tween(this.buttonRefs['book']).to({}, 1000).start().onComplete(this.stopBookSound.bind(this));
    }

    private stopBookSound(): void {
        sound.stop("SoundBook");
    }

    public override destroy(options: boolean | IDestroyOptions | undefined) {
        super.destroy(options);
    }

    public update(_deltaFrame: number, deltaTime: number): void {
        this.infoText.text = "Player position inside the world: " +
            this.graphicRed.x.toFixed(1) + ", " + this.graphicRed.y.toFixed(1) + "\nWorld position: " +
            this.world.x.toFixed(1) + ", " + this.world.y.toFixed(1);

        if (this.goingUp) {
            this.world.y += 0.1 * deltaTime;
            this.infoText.text += " ⬇";
        } else if (this.goingDown) {
            this.world.y -= 0.1 * deltaTime;
            this.infoText.text += " ⬆️";
        }

        if (Keyboard.state.get("ArrowRight")) {
            this.graphicRed.x += 0.1 * deltaTime;
            this.infoText.text += " ➡";
        } else if (Keyboard.state.get("ArrowLeft")) {
            this.graphicRed.x -= 0.1 * deltaTime;
            this.infoText.text += " ⬅";
        }

        if (Keyboard.state.get("ArrowDown")) {
            this.graphicRed.y += 0.1 * deltaTime;
            this.infoText.text += " ⬇";
        } else if (Keyboard.state.get("ArrowUp")) {
            this.graphicRed.y -= 0.1 * deltaTime;
            this.infoText.text += " ⬆";
        }

        if (Keyboard.state.get("KeyD")) {
            this.world.x -= 0.1 * deltaTime;
            this.infoText.text += " ⬅";
        } else if (Keyboard.state.get("KeyA")) {
            this.world.x += 0.1 * deltaTime;
            this.infoText.text += " ➡";
        }

        if (Keyboard.state.get("KeyS")) {
            this.world.y -= 0.1 * deltaTime;
            this.infoText.text += " ⬆";
        } else if (Keyboard.state.get("KeyW")) {
            this.world.y += 0.1 * deltaTime;
            this.infoText.text += " ⬇";
        }

        // LIMITES DE MOVIMIENTO DEL MAPA
        if (this.world.scale.x === this.minScale) {
            this.world.scale.set(this.minScale);
        }

        // LIMITE IZQUIERDO
        if (this.world.scale.x === this.minScale + 0.1 && this.world.position.x < -128) {
            this.world.position.x = -128;
        } else if (this.world.position.x > 0) {
            this.world.position.x = 0;
        }

        // LIMITE INFERIOR
        if (this.world.y > 238) {
            this.world.y = 238;
        } else if (this.world.position.x !== 0) {
            this.world.position.x = 0;
        }

        if (this.world.position.y < 0) {
            this.world.position.y = 0;
        } else if (this.position.y > 240) {
            this.position.y = 240;
        }
    }

    private onStageOneClick(): void {
        sound.stop("MapBGM");
        SceneManager.changeScene(new GameScene());
    }

    private onStageTwoClick(): void {
        sound.stop("MapBGM");
        SceneManager.changeScene(new GameScene());
    }

    private onStageThreeClick(): void {
        sound.stop("MapBGM");
        SceneManager.changeScene(new GameScene());
    }

    private onStageFourClick(): void {
        sound.stop("MapBGM");
        SceneManager.changeScene(new GameScene());
    }

    private onMenu(): void {
        sound.stop("MapBGM");
        SceneManager.changeScene(new GameStartScene());
    }

    private removeGroups(packagesToRemove: string[][], container: any): void {
        packagesToRemove.forEach((packageToRemove) => {
            packageToRemove.forEach((ref) => {
                this.removeChild(container[ref]);
            });
        });
    }
}