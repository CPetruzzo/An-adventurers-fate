import { TextStyle } from "pixi.js";

/** Flag para determinar si quiero que haya sonido en el juego o no
 * @argument if true then all sounds are shut down from start
 */
export const DEBUG_SOUND: boolean = false;
export const DEBUG_SFX: boolean = false;
export const DEBUG_ALL_SOUNDS: boolean = false;
export const GLOBAL_VOLUME: number = 0.3;
export const DEBUG_ALPHA: boolean = false;

/** Cantidad de flechas iniciales */
export const INITIAL_ARROWS: number = 10;

/** Escalas para los botones de UI en escena */
export const BUTTON_SCALE: number = 1;
export const START_SCALE = 1.2;
export const MOVEMENTS_SCALE = 1.8;
export const UI_SCALE = 1.45;
export const UI_CONFIG = 0.5;
export const STAGE_SCALE = 0.8;

export const MASK_TIME: number = 3000;
export const MASK_TIME_LINE_BY_LINE: number = 1000;

// startscene bg
export const timeBGUPDOWN: number = 15000;
export const yBGUPDOWN: number = 100;

// transitions speed
export const TRANSITION_TIME: number = 500;

// dialogbox alpha
export const DIALOG_ALPHA: number = 0.8;
export const TEXT_TIME_LETTER_BY_LETTER: number = 100;

// FONTS
export const LETRA1 = new TextStyle({
  fontFamily: "Letra1",
  fontSize: 25,
  fill: 0x1819,
});
export const LETRA1TITLE = new TextStyle({
  fontFamily: "Letra1",
  fontSize: 65,
  fill: 0x1819,
});
export const LETRA1SUBTITLE = new TextStyle({
  fontFamily: "Letra1",
  fontSize: 45,
  fill: 0x1819,
});
export const LETRA2 = new TextStyle({
  fontFamily: "Letra2",
  fontSize: 48,
  fill: 0x1819,
});
export const LETRA3 = new TextStyle({
  fontFamily: "Letra3",
  fontSize: 120,
  fill: 0xFFFFFF,
  lineJoin: "round",
  dropShadow: true,
  dropShadowAlpha: 0.6,
  dropShadowBlur: 3,
  dropShadowDistance: 10,
  letterSpacing: 12,
  stroke: "#0008ff",
  strokeThickness: 3,
});
export const LETRA5 = new TextStyle({
  fontFamily: "Letra5",
  fontSize: 120,
  fill: 0x1819,
});

export const LETRA4 = new TextStyle({
  fontFamily: "Letra3",
  fontSize: 30,
  fill: 0xFFFFFF,
  lineJoin: "round",
  dropShadow: true,
  dropShadowAlpha: 0.6,
  dropShadowBlur: 3,
  dropShadowDistance: 10,
  letterSpacing: 12,
  stroke: "#0008ff",
  strokeThickness: 3,
  wordWrap: true,
  wordWrapWidth: 700,
});

// change this to change level from ldtk
export const CURRENT_LEVEL: number = 1;
export const PLAYER_WALK_SPEED: number = 0.05;
export const LEVEL_SCALE: number = 3.5;
export const PLAYER_SCALE: number = 2;
export const ANIM_SPEED: number = 0.15;
export const JUMP_FACTOR: number = 0.45;