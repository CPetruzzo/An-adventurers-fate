import { Resource, Sprite, Text, Texture } from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { LETRA7, TRANSITION_TIME } from "../utils/constants";
import { SceneManager } from "../utils/SceneManager";
import { MapScene } from "./MapScene";
import { TransitionScene, TransitionTypes } from "../utils/TransitionScene";
import { getPlayerName } from "../utils/TextParams";
import { Tween } from "tweedle.js";

export class HistoryScene extends SceneBase {
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
        const texture3 = Texture.from("Castle2");
        const texture4 = Texture.from("LOSE");
        const texture5 = Texture.from("CONFIG_BG");
        this.backgrounds.push(texture1, texture2, texture3, texture4, texture5);

        const text1 = `In a distant mysterious land, an anonymous hero emerges, unaware of his destined fate. His humble origins trace back to a tranquil village where life is simple and peaceful.`;
        const text2 = `A dark force, driven by mortal ambition, threatens to disrupt the world, and our hero is unwittingly drawn into life-changing events.`;
        const text3 = `A powerful ancient artifact emerges, its purpose unknown but alluring. Curiosity and necessity lead our protagonist to seek out this legendary object.`;
        const text4 = `As he progresses, our hero's fate becomes linked to Arek, a legendary warrior of valor and sacrifice. However, the true extent of his role in shaping destiny remains hidden by time.`;
        const text5 = `Are you ready to embark on this epic journey and discover the power that lies within you? Adventure awaits, and the future of this world rests in your hands.`;

        console.log('getPlayerName()', getPlayerName())
        this.texts.push(text1, text2, text3, text4, text5, text5);

        // Inicializar elementos visuales
        this.currentBackground = new Sprite();
        this.resetBackgroundSettings();
        this.addChild(this.currentBackground);

        const tween1 = new Tween(this.currentBackground.scale).to({ x: 1.2, y: 1.2 }, 15000);
        const tween2 = new Tween(this.currentBackground.scale).from({ x: 1.7, y: 1.7 }).to({ x: 1.7, y: 1.7 }, 15000);
        const tween3 = new Tween(this.currentBackground).from({ y: 410 }).to({ y: 450 }, 15000);
        const tween4 = new Tween(this.currentBackground).from({ y: 100 }).to({ y: 300 }, 15000);
        const tween5 = new Tween(this.currentBackground.scale).from({ x: 1.7, y: 1.7 }).to({ x: 1.7, y: 1.7 }, 15000);
        this.tweens.push(tween1, tween2, tween3, tween4, tween5);

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
                SceneManager.changeScene(new MapScene(), new TransitionScene(TRANSITION_TIME, TransitionTypes.FADE));
            } else {
                this.updateHistoryPage(this.currentPageIndex);
                this.timer = this.pageDuration;
            }
        }
    }

    private updateHistoryPage(index: number): void {
        this.currentBackground.texture = this.backgrounds[index];
        this.currentBackground.scale.set(SceneManager.WIDTH / this.currentBackground.texture.width);
        this.currentText.text = this.texts[index];
        new Tween(this.currentBackground).from({ alpha: 0 }).to({ alpha: 1 }, 2000).start()
        this.tweens[index].start();
        console.log('this.tweens[index]', this.tweens[index])
    }

    private onNextPageClick(): void {
        this.currentPageIndex++;
        this.tweens[this.currentPageIndex - 1].stop();
        this.resetBackgroundSettings();
        if (this.currentPageIndex >= this.backgrounds.length) {
            // Cambiar de escena al llegar al final de las páginas
            SceneManager.changeScene(new MapScene(), new TransitionScene(TRANSITION_TIME, TransitionTypes.FADE));
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
