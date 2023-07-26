import { TextStyle } from "pixi.js";

/** Cantidad de flechas iniciales */
export const INITIALARROWS: number = 10;

/** Escalas para los botones de UI en escena */
export const BUTTON_SCALE: number = 1;
export const START_SCALE = 1.2;
export const MOVEMENTS_SCALE = 1.8;
export const UI_SCALE = 1.45;
export const UI_CONFIG = 0.5;

export const LETRA1 = new TextStyle({ fontFamily: "Letra1", fontSize: 25, fill: 0X1819 });
export const LETRA1TITLE = new TextStyle({ fontFamily: "Letra1", fontSize: 65, fill: 0X1819 });
export const LETRA1SUBTITLE = new TextStyle({ fontFamily: "Letra1", fontSize: 45, fill: 0X1819 });
export const LETRA2 = new TextStyle({ fontFamily: "Letra2", fontSize: 48, fill: 0X1819 });
export const LETRA3 = new TextStyle({
    fontFamily: "Letra3", fontSize: 90, fill: 0X1819, lineJoin: "round",
    dropShadow: true,
    dropShadowAlpha: 0.6,
    dropShadowBlur: 3,
    dropShadowDistance: 10,
    letterSpacing: 12,
    stroke: "#0008ff",
    strokeThickness: 3
});
export const LETRA5 = new TextStyle({ fontFamily: "Letra5", fontSize: 120, fill: 0X1819 });

