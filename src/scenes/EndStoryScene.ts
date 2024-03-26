import { Resource, Sprite, Text, Texture } from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import {
    LETRA7,
    //  TRANSITION_TIME
} from "../utils/constants";
import { SceneManager } from "../utils/SceneManager";
// import { TransitionScene, TransitionTypes } from "../utils/TransitionScene";
import { Tween } from "tweedle.js";

export class EndStoryScene extends SceneBase {
    private backgrounds: Texture<Resource>[] = [];
    private texts: string[] = [];
    private currentBackground: Sprite;
    private currentText: Text;
    private currentPageIndex: number = 0;
    private timer: number = 0;
    private pageDuration: number = 500;
    private tweens: any[] = [];
    constructor() {
        super();

        // Agregar fondos y textos a la escena
        const texture1 = Texture.from("HISTORY1");
        const texture2 = Texture.from("CONFIG_BG");
        const texture3 = Texture.from("WINDOWSCENE");
        const texture5 = Texture.from("CONFIG_BG");
        this.backgrounds.push(texture1, texture2, texture3, texture5);

        const text1 = `As our hero reached this journey's end, by reaching the castle tower a weird light surronded him.`;
        const text2 = `Now, a new and eternal life awaits for him as the world is unnaware of what's on it's way, a lot of new events await for him to command.`;
        const text3 = `His bloodline cannot be stopped, 5 children he had, Erim, Daos, Gades, Amon and...`;
        const text4 = `Maxim`;

        this.texts.push(text1, text2, text3, text4);

        // Inicializar elementos visuales
        this.currentBackground = new Sprite();
        this.resetBackgroundSettings();
        this.addChild(this.currentBackground);

        const tween1 = new Tween(this.currentBackground).to({ tint: 0x000000 }, 15000);
        const tween2 = new Tween(this.currentBackground.scale).from({ x: 1.7, y: 1.7 }).to({ x: 1.7, y: 1.7 }, 15000);
        const tween3 = new Tween(this.currentBackground).from({ y: 610 }).to({ y: 100 }, 10000);
        const tween5 = new Tween(this.currentBackground.scale).from({ x: 1.7, y: 1.7 }).to({ x: 1.2, y: 1.2 }, 13000);
        this.tweens.push(tween1, tween2, tween3, tween5);

        this.currentText = new Text("", LETRA7);
        this.currentText.anchor.set(0.5);
        this.currentText.style.align = "center";
        this.currentText.position.set(SceneManager.WIDTH * 0.5, SceneManager.HEIGHT * 0.5);
        this.addChild(this.currentText);

        // Actualizar la primera página
        this.updateHistoryPage(this.currentPageIndex);

        // Iniciar temporizador para cambiar de página
        this.timer = this.pageDuration;

        // Escuchar el evento de clic en la pantalla
        this.interactive = true;
        this.on("pointerdown", this.onNextPageClick.bind(this));
    }

    public override update(deltaFrame: number): void {
        // Actualizar temporizador
        this.timer -= deltaFrame;

        // Cambiar de página cuando el temporizador llegue a cero
        if (this.timer <= 0) {
            this.currentPageIndex++;
            this.tweens[this.currentPageIndex - 1].stop();
            this.resetBackgroundSettings();
            if (this.currentPageIndex >= this.backgrounds.length) {
                // Cambiar de escena al llegar al final de las páginas
                // SceneManager.changeScene(new MapScene(), new TransitionScene(TRANSITION_TIME, TransitionTypes.FADE));
            } else {
                this.updateHistoryPage(this.currentPageIndex);
                this.timer = this.pageDuration;
            }
        }
    }

    private updateHistoryPage(index: number): void {
        this.currentBackground.texture = this.backgrounds[index];
        if (index < this.backgrounds.length) {
            this.currentBackground.scale.set(SceneManager.WIDTH / this.currentBackground.texture.width);
        }
        this.currentText.text = this.texts[index];
        new Tween(this.currentBackground).from({ alpha: 0 }).to({ alpha: 1 }, 2000).start()
        this.tweens[index].start();
    }

    private onNextPageClick(): void {
        this.currentPageIndex++;
        this.tweens[this.currentPageIndex - 1].stop();
        this.resetBackgroundSettings();
        if (this.currentPageIndex >= this.backgrounds.length) {
            // Cambiar de escena al llegar al final de las páginas
        } else {
            this.updateHistoryPage(this.currentPageIndex);
            this.timer = this.pageDuration;
        }
    }

    private resetBackgroundSettings(): void {
        this.currentBackground.scale.set(1.25);
        this.currentBackground.anchor.set(0.5);
        this.currentBackground.position.set(SceneManager.WIDTH * 0.5, SceneManager.HEIGHT * 0.5);
    }
}
