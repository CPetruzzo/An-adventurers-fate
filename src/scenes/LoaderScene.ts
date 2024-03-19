import { WebfontLoaderPlugin } from "pixi-webfont-loader";
import { Graphics, Loader, Sprite } from "pixi.js";
import { assets } from "../assets";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { TransitionScene, TransitionTypes } from "../utils/TransitionScene";
import { TRANSITION_TIME } from "../utils/constants";
import { GameStartScene } from "./GameStartScene";

export class LoaderScene extends SceneBase {
  public update(): void { }

  private loadbar: Graphics;

  constructor() {
    super();

    const fondo: Sprite = Sprite.from("StartMenu/assetloadbar2.png");
    const screenRelation = 0.71;
    fondo.scale.set(screenRelation);

    this.loadbar = new Graphics();
    this.setBarPercent(0);

    this.loadbar.x = SceneManager.WIDTH * 0.5;
    this.loadbar.y = SceneManager.HEIGHT * 0.5;

    this.loadbar.pivot.x = this.loadbar.width / 2;
    this.loadbar.pivot.y = this.loadbar.height / 5;

    this.addChild(this.loadbar);
    this.addChild(fondo);

    this.downloadAssets();
  }

  private downloadAssets() {
    Loader.registerPlugin(WebfontLoaderPlugin);
    Loader.shared.add(assets);
    Loader.shared.onComplete.once(this.whenLoadFinishes.bind(this));
    Loader.shared.load();
    Loader.shared.onProgress.add((Loader: { progress: number }) =>
      this.setBarPercent(Loader.progress)
    );
  }

  private setBarPercent(percent: number) {
    const factor = percent / 100;
    this.loadbar.clear();
    this.loadbar.beginFill(0xccffff, 1);
    this.loadbar.drawRect(
      0,
      0,
      SceneManager.WIDTH * 0.45 * factor,
      SceneManager.HEIGHT * 0.1
    );
    this.loadbar.endFill();
    this.loadbar.lineStyle(2, 0xffffff, 1);
    this.loadbar.beginFill(0xffffff, 0);
    this.loadbar.drawRect(
      0,
      0,
      SceneManager.WIDTH * 0.45,
      SceneManager.HEIGHT * 0.1
    );
    this.loadbar.endFill();
  }

  private whenLoadFinishes() {
    SceneManager.changeScene(new GameStartScene(), new TransitionScene(TRANSITION_TIME, TransitionTypes.FADE));
  }
}
