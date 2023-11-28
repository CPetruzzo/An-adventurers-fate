import { Capacitor } from "@capacitor/core";
import { LoaderScene } from "./scenes/LoaderScene";
import { SceneManager } from "./utils/SceneManager";
import { StatusBar } from "@capacitor/status-bar";
import { KeepAwake } from "@capacitor-community/keep-awake";
import { App } from "@capacitor/app";
import { pauseSounds, resumeSounds } from "./utils/SoundParams";

SceneManager.initialize();

SceneManager.changeScene(new LoaderScene());

window.addEventListener("contextmenu", (e) => e.preventDefault());

export let isMobileDevice: boolean;
if (navigator.userAgent.includes("Mobile")) {
  isMobileDevice = true;
  console.log("Estás accediendo desde un dispositivo móvil.");
} else {
  isMobileDevice = false;
  console.log("Estás accediendo desde una computadora.");
}

if (Capacitor.isNativePlatform()) {
  StatusBar.hide();
  KeepAwake.keepAwake();
  App.addListener("appStateChange", (e) => {
    if (e.isActive) {
      //resumo el juego
      resumeSounds();
    } else {
      //pausa el juego
      pauseSounds();
    }
  });
}
