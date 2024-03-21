import { Sprite, Text } from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { Easing, Tween } from "tweedle.js";
import { SceneManager } from "../utils/SceneManager";
import { LoaderScene } from "./LoaderScene";
import { TransitionScene, TransitionTypes } from "../utils/TransitionScene";
import { LETRA7, TRANSITION_TIME } from "../utils/constants";

export class CachoGames extends SceneBase {
    constructor() {
        super();

        const cachoGames = Sprite.from("backgroundpetruzzo.png");
        this.addChild(cachoGames);
        cachoGames.scale.set(0.7)
        cachoGames.alpha = 0;

        const cachoGamesText = new Text("CachoGames", LETRA7);
        cachoGamesText.scale.set(0.8);
        cachoGamesText.anchor.set(0.5);
        cachoGamesText.position.set(SceneManager.WIDTH * 0.5 + 20, SceneManager.HEIGHT * 0.5 - 30);
        this.addChild(cachoGamesText);

        const fondo: Sprite = Sprite.from("StartMenu/assetloadbar2.png");
        console.log('fondo', fondo)

        new Tween(cachoGames).to({ alpha: 1 }, 10000).start().easing(Easing.Elastic.Out).onComplete(() => {
            SceneManager.changeScene(new LoaderScene(), new TransitionScene(TRANSITION_TIME, TransitionTypes.FADE));
        });

    }

    public override update(_deltaFrame: number): void {
    }
}