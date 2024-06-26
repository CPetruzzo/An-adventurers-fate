import { Application, Ticker } from "pixi.js";
import { Group } from "tweedle.js";
import { Keyboard } from "./Keyboard";
import { SceneBase } from "./SceneBase";

export namespace SceneManager {
  export const WIDTH = 1280; // 1560 fullscreen cel
  export const HEIGHT = 720;
  export let currentScene: SceneBase;
  let app: Application;
  (globalThis as { __PIXI_APP__?: Application }).__PIXI_APP__;
  
  export function initialize(): void {
    if (app != undefined) {
      console.error("Don't call initialize twice!");
      return;
    }

    app = new Application({
      view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
      // resolution: window.devicePixelRatio || 1,
      resolution: 1,
      autoDensity: true,
      backgroundColor: 0x000000,
      width: WIDTH,
      height: HEIGHT,
    });

    // Asignar la aplicación a la variable global indicada por el debugger de Pixi.js
    (globalThis as any).__PIXI_APP__ = app;

    Keyboard.initialize(); /* lo llamo una vez y nunca mas */
    window.addEventListener("resize", () => {
      console.log("resized!");
      const scaleX = window.innerWidth / app.screen.width;
      const scaleY = window.innerHeight / app.screen.height;
      const scale = Math.min(scaleX, scaleY);

      const gameWidth = Math.round(app.screen.width * scale);
      const gameHeight = Math.round(app.screen.height * scale);

      const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2);
      const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);

      app.view.style.width = gameWidth + "px";
      app.view.style.height = gameHeight + "px";

      app.view.style.marginLeft = marginHorizontal + "px";
      app.view.style.marginRight = marginHorizontal + "px";

      app.view.style.marginTop = marginVertical + "px";
      app.view.style.marginBottom = marginVertical + "px";
    });
    window.dispatchEvent(new Event("resize"));
    Ticker.shared.add(update);
  }

  export function changeScene(newScene: SceneBase, _transition?: any): void {
    if (currentScene) {
      currentScene.destroy();
    }

    currentScene = newScene;

    // if(_transition.closed){
    app.stage.addChild(currentScene);
    // }
    if (_transition) {
      app.stage.addChild(_transition);
    }
  }

  function update(framePassed: number): void {
    Group.shared.update();
    currentScene?.update(framePassed, Ticker.shared.deltaMS);
  }
}

export function Timer(time: number, onComplete: () => void): void {
  setTimeout(onComplete, time);
}
