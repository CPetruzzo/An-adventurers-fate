import { Tween } from "tweedle.js";
import { SceneBase } from "./SceneBase";
import { Graphics, Sprite } from "pixi.js";
import { SceneManager } from "./SceneManager";

export class TransitionScene extends SceneBase {
  private rightSlide: Sprite;
  private leftSlide: Sprite;
  public closed: boolean = false;
  private blackScreen: Graphics;
  constructor(_transitionTime?: number, _transitionType?: string) {
    super();

    this.blackScreen = new Graphics();
    this.blackScreen.beginFill(0xffffff, 1);
    this.blackScreen.drawRect(0, 0, SceneManager.WIDTH, SceneManager.HEIGHT);
    this.blackScreen.endFill();
    this.addChild(this.blackScreen);

    this.rightSlide = Sprite.from("plus");
    this.rightSlide.anchor.set(0.62);
    this.leftSlide = Sprite.from("plus");
    this.leftSlide.anchor.set(0.38, 0.62);

    if (_transitionType == "CURTAIN") {
      this.addChild(this.rightSlide, this.leftSlide);
    }

    if (_transitionTime != undefined && _transitionType != undefined) {
      this.close(
        _transitionTime,
        _transitionType,
        this.open(_transitionTime, _transitionType)
      );
    }
  }

  public override update(): void {
    throw new Error("Method not implemented.");
  }

  private close(
    _transitionTime: number,
    _transitionType: string,
    onComplete: void
  ): void {
    switch (_transitionType) {
      case "CURTAIN":
        new Tween(this.rightSlide)
          .from({ x: SceneManager.WIDTH, y: this.rightSlide.height / 2 })
          .to(
            {
              x: SceneManager.WIDTH / 2 + this.rightSlide.width / 2,
              y: this.rightSlide.height / 2,
            },
            _transitionTime / 4
          )
          .start()
          .onComplete(() => onComplete);

        new Tween(this.leftSlide)
          .from({ x: 0, y: this.leftSlide.height / 2 })
          .to(
            {
              x: SceneManager.WIDTH / 2 - this.leftSlide.width / 2,
              y: this.leftSlide.height / 2,
            },
            _transitionTime / 4
          )
          .start()
          .onComplete(() => {
            onComplete;
          });
        break;
      default:
        break;
    }
  }

  private open(_transitionTime: number, _transitionType: string): void {
    switch (_transitionType) {
      case "CURTAIN":
        new Tween(this.rightSlide)
          .from({
            x: SceneManager.WIDTH / 2 + this.rightSlide.width / 4,
            y: this.rightSlide.height / 2,
          })
          .to(
            {
              x: SceneManager.WIDTH + this.rightSlide.width / 2,
              y: this.rightSlide.height / 2,
            },
            _transitionTime
          )
          .start();
        new Tween(this.leftSlide)
          .from({
            x: SceneManager.WIDTH / 2 - this.leftSlide.width / 4,
            y: this.leftSlide.height / 2,
          })
          .to({ x: -this.leftSlide.width / 2 }, _transitionTime)
          .start()
          .onComplete(() => {
            console.log("open");
            this.closed = true;
            new Tween(this.blackScreen)
              .to({ alpha: 0 }, _transitionTime * 2)
              .start();
            // this.destroy();
          });
        break;
      case "FADE":
        new Tween(this.blackScreen)
          .to({ alpha: 0 }, _transitionTime * 2)
          .start();
        break;
      default:
        break;
    }
  }
}
