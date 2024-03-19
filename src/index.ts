import { Capacitor } from "@capacitor/core";
import { SceneManager } from "./utils/SceneManager";
import { StatusBar } from "@capacitor/status-bar";
import { KeepAwake } from "@capacitor-community/keep-awake";
import { App } from "@capacitor/app";
import { pauseSounds, resumeSounds, setVolume } from "./utils/SoundParams";
import { GLOBAL_VOLUME } from "./utils/constants";
import { Player } from "./games/Player";
import { getValue, setValue } from "./utils/FunctionManager";
import { LoaderScene } from "./scenes/LoaderScene";
import { Characters } from "./games/PhysicsContainer";

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

export let volume = getValue("volume");
if (volume === null) {
  volume = GLOBAL_VOLUME;
  setVolume(volume);
} else {
  setVolume(volume);
}

export let level = getValue("level");
if (level == null) {
  level = 1;
}
setValue("level", level);
Player.level = level;
console.log('Player.level', Player.level)

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

document.addEventListener("DOMContentLoaded", () => {
  const audioCtx = new AudioContext();
  if (audioCtx.state === "running") {
    audioCtx.suspend().then(() => {
    });
  } else if (audioCtx.state === "suspended") {
    audioCtx.resume().then(() => {
    });
  }
});

const spreadsheetId = "1CfLNKIOOWvek-sqCQA9i4kxEvVC2Fx0cZe9TYtmVXvs";
const tabName = "Characters";
const apiUrl = `https://opensheet.elk.sh/${spreadsheetId}/${tabName}`;

export let sheetData: Characters;
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // console.log("Datos obtenidos:", data);
    sheetData = data;
    console.log(`${tabName}`, sheetData);
  })
  .catch((error) => {
    console.error("Error al obtener datos:", error);
  });

