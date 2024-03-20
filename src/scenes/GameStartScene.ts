import { Sprite, Texture, IDestroyOptions, filters } from "pixi.js";
import { Tween } from "tweedle.js";
import { PointButton } from "../ui/PointButton";
import { ToggleButton } from "../ui/ToggleButton";
import {
  startParams,
  configParams,
  textSceneParams,
} from "../utils/ButtonParams";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import {
  MusicNames,
  getGlobalVolume,
  playSound,
  stopAllSounds,
} from "../utils/SoundParams";
import { createText } from "../utils/TextParams";
import { LETRA6, TRANSITION_TIME, timeBGUPDOWN, yBGUPDOWN } from "../utils/constants";
import { Config } from "./Config";
import { MapScene } from "./MapScene";
import { TextScene } from "./TextScene";
import { Text } from "pixi.js";
import { createPointButton, createSprite } from "../utils/FunctionManager";
import { TransitionScene, TransitionTypes } from "../utils/TransitionScene";

export class GameStartScene extends SceneBase {
  private titulo: Text;
  private textscene: PointButton;
  private buttonSound: ToggleButton;
  private BG: Sprite;
  private config: PointButton;
  private start: PointButton;
  private buttons: PointButton[];
  public currentButton: number;
  public count: number;

  constructor() {
    super();

    this.name = "START";

    const globalvolume = getGlobalVolume();
    console.log("globalvolume", globalvolume);
    if (globalvolume != undefined) {
      playSound(MusicNames.BEGIN, { loop: true, volume: 0.05 });
    }

    this.BG = createSprite({
      texture: "Castle1",
      scale: { x: 1, y: 1 },
      position: { x: 0, y: -yBGUPDOWN },
    });
    this.BG.anchor.set(0.15)

    this.buttons = [];
    this.start = createPointButton(startParams, "pointerClick", () =>
      this.onStartClick(), this, "Start", LETRA6
    );
    this.start.name = "start";
    this.config = createPointButton(configParams, "pointerClick", () =>
      this.onConfigClick(), this, "Config", LETRA6
    );
    this.config.name = "settings";
    this.textscene = createPointButton(textSceneParams, "pointerClick", () =>
      this.onTextClick(), this, "About", LETRA6
    );
    this.textscene.name = "about";
    this.buttons.push(this.start, this.config, this.textscene);

    this.currentButton = 0;

    // Sound ON-OFF
    this.buttonSound = new ToggleButton(
      Texture.from("TINY_SOUND_BUTTON"),
      Texture.from("TINY_SOUND_BUTTON_OFF")
    );
    this.buttonSound.scale.set(0.08)
    this.buttonSound.x = SceneManager.WIDTH - this.buttonSound.width * 0.5;
    this.buttonSound.y = this.buttonSound.height / 2;
    this.buttonSound.on(ToggleButton.TOGGLE_EVENT, (newState) => {
      console.log("toggle changed to:", newState);
    });

    this.titulo = createText({
      text: "An adventurer's fate",
      style: LETRA6,
      position: { x: SceneManager.WIDTH / 4, y: 200 },
    });

    const noiseFilter = new filters.NoiseFilter();
    noiseFilter.noise = 0.5;

    const blurFilter = new filters.BlurFilter();
    // this.BG.filters = [blurFilter];

    this.titulo.filters = [blurFilter];

    this.titulo.scale.set(0.4);
    this.titulo.anchor.set(0.5);
    new Tween(this.titulo.style)
      .to({ dropShadowDistance: 2 }, 1500)
      .repeat(Infinity)
      .yoyo(true)
      .start();

    this.addChild(
      this.BG,
      this.buttonSound,
      this.config,
      this.start,
      this.textscene,
      this.titulo
    );

    this.count = 0;

    new Tween(this.BG)
      .from({ x: 0, y: -yBGUPDOWN })
      .to({ x: 0, y: 0 }, timeBGUPDOWN)
      .start()
      .onComplete(this.bGdown.bind(this));
  }

  public update(): void {
    this.count += 0.005;

    if (this.titulo.filters != null) {
      const blurAmount = Math.cos(this.count);
      const blurScale = 1 - Math.abs(blurAmount);
      // @ts-ignore
      this.titulo.filters[0].blur = blurScale * 30;

    }
  }

  public override destroy(
    options: boolean | IDestroyOptions | undefined
  ): void {
    super.destroy(options);
  }

  private onTextClick(): void {
    console.log("Apreté Config", this);
    stopAllSounds();
    SceneManager.changeScene(new TextScene(), new TransitionScene(TRANSITION_TIME, TransitionTypes.FADE));
    console.log(SceneManager.currentScene.name);
  }

  private onConfigClick(): void {
    stopAllSounds();
    SceneManager.changeScene(new Config(), new TransitionScene(TRANSITION_TIME, TransitionTypes.FADE));
    console.log(SceneManager.currentScene.name);
  }

  private onStartClick(): void {
    stopAllSounds();
    SceneManager.changeScene(new MapScene(), new TransitionScene(TRANSITION_TIME, TransitionTypes.FADE));
    console.log(SceneManager.currentScene.name);
  }

  private bGdown(): void {
    new Tween(this.BG)
      .from({ y: 0 })
      .to({ y: -yBGUPDOWN }, timeBGUPDOWN)
      .start()
      .onComplete(this.bGup.bind(this));
  }

  private bGup(): void {
    new Tween(this.BG)
      .from({ y: -yBGUPDOWN })
      .to({ y: 0 }, timeBGUPDOWN)
      .start()
      .onComplete(this.bGdown.bind(this));
  }
}
