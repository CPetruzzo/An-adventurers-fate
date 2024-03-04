import { Texture } from "pixi.js";
import { BUTTON_SCALE, MOVEMENTS_SCALE, STAGE_SCALE, START_SCALE, UI_CONFIG } from "./constants";
import { PointButton } from "../ui/PointButton";
import { SceneManager } from "./SceneManager";

/** Use a function to create PointButtons with common parameters
 * @param params parameters for that pointerbutton, x, y, scale, texture def, over, down
 * @param _event name of the event, for example, pointer down
 * @param _callback void function that's applyied when the pointerbutton launches it's event
 */
export function createPointButton(params: ButtonParams, event: string | symbol, fn: VoidFunction, context?: any): PointButton {
    const button = new PointButton(
        Texture.from(params.textureNameDef),
        Texture.from(params.textureOver),
        Texture.from(params.textureClick)
    );
    button.x = params.x;
    button.y = params.y;
    button.scale.set(params.scale);

    button.alpha ? params.alpha : 1; 

    // Añadir eventos al botón
    button.on(event, fn, context);

    return button;
};

export type ButtonParams = {
    x: number,
    y: number,
    scale: number,
    textureNameDef: string;
    textureOver: string;
    textureClick: string;
    alpha?: number
};

export const configButtonGame: ButtonParams = {
    x: 650,
    y: 500,
    scale: UI_CONFIG,
    textureNameDef: "CONFIG.png",
    textureOver: "CONFIG hundido.png",
    textureClick: "CONFIG hundido.png",
};

export const buttonsOff: ButtonParams = {
    x: 1070,
    y: 40,    scale: 0.095,
    textureNameDef: "plus",
    textureOver: "plus",
    textureClick: "plus",
};

export const buttonsOn: ButtonParams = {
    x: 1070,
    y: 40,
    scale: 0.095,
    textureNameDef: "plus",
    textureOver: "plus",
    textureClick: "plus",
};

export const buttonA: ButtonParams = {
    x: 980,
    y: 540,
    scale: BUTTON_SCALE,
    textureNameDef: "lineDark31.png",
    textureOver: "lineDark31.png",
    textureClick: "lineDark31.png"
};

export const buttonB: ButtonParams = {
    x: 1120,
    y: 430,
    scale: BUTTON_SCALE,
    textureNameDef: "lineDark32.png",
    textureOver: "lineDark32.png",
    textureClick: "lineDark32.png",
};

export const pauseOn: ButtonParams = {
    x: 1230,
    y: 40,
    scale: 0.1,
    textureNameDef: "genericButton",
    textureOver: "genericButton",
    textureClick: "genericButton",
};

export const pauseOff: ButtonParams = {
    x: 1230,
    y: 40,
    scale: 0.1,
    textureNameDef: "genericButton",
    textureOver: "genericButton",
    textureClick: "genericButton",
};

export const moveUp: ButtonParams = {
    x: 180,
    y: 440,
    scale: MOVEMENTS_SCALE,
    textureNameDef: "lineDark48.png",
    textureOver: "lineLight01.png",
    textureClick: "lineDark48.png",
};

export const moveDown: ButtonParams = {
    x: 180,
    y: 620,
    scale: MOVEMENTS_SCALE,
    textureNameDef: "lineDark05.png",
    textureOver: "lineLight08.png",
    textureClick: "lineDark05.png",
};
export const moveRight: ButtonParams = {
    x: 260,
    y: 530,
    scale: MOVEMENTS_SCALE,
    textureNameDef: "lineDark01.png",
    textureOver: "lineLight04.png",
    textureClick: "lineDark01.png",
};
export const moveLeft: ButtonParams = {
    x: 100,
    y: 530,
    scale: MOVEMENTS_SCALE,
    textureNameDef: "lineDark00.png",
    textureOver: "lineLight03.png",
    textureClick: "lineDark00.png",
};

export const start: ButtonParams = {
    x: 1130,
    y: 580,
    scale: START_SCALE,
    textureNameDef: "lineDark44.png",
    textureOver: "lineLight47.png",
    textureClick: "lineLight44.png",
};

export const stageOne: ButtonParams = {
    x: 580,
    y: 750,
    scale: STAGE_SCALE,
    textureNameDef: "lineDark23.png",
    textureOver: "lineLight26.png",
    textureClick: "lineLight23.png",
};

export const stageTwo: ButtonParams = {
    x: 282,
    y: 132,
    scale: STAGE_SCALE,
    textureNameDef: "lineDark23.png",
    textureOver: "lineLight26.png",
    textureClick: "lineLight23.png",
};

export const stageThree: ButtonParams = {
    x: 1022,
    y: 432,
    scale: STAGE_SCALE,
    textureNameDef: "lineDark23.png",
    textureOver: "lineLight26.png",
    textureClick: "lineLight23.png",
};

export const stageFour: ButtonParams = {
    x: 102,
    y: 482,
    scale: STAGE_SCALE,
    textureNameDef: "lineDark23.png",
    textureOver: "lineLight26.png",
    textureClick: "lineLight23.png",
};

export const book: ButtonParams = {
    x: 380,
    y: 650,
    scale: 0.18,
    textureNameDef: "BookOff",
    textureOver: "Book",
    textureClick: "Book",
};

export const shield: ButtonParams = {
    x: 240,
    y: 640,
    scale: 0.15,
    textureNameDef: "ShieldOff",
    textureOver: "Shield",
    textureClick: "Shield",
};

export const menuBag: ButtonParams = {
    x: 100,
    y: 650,
    scale: 0.18,
    textureNameDef: "BagOff",
    textureOver: "Bag",
    textureClick: "Bag",
};

export const closeBook: ButtonParams = {
    x: 1020,
    y: 150,
    scale: 0.08,
    textureNameDef: "minus",
    textureOver: "minus",
    textureClick: "minus",
};

export const backMenu: ButtonParams = {
    x: SceneManager.WIDTH - 45,
    y: 45,
    scale: 0.09,
    textureNameDef: "minus",
    textureOver: "minus",
    textureClick: "minus",
};

// Agrega aquí otros ButtonParams para los botones restantes...

export const button1: ButtonParams = {
    x: 640,
    y: 420,
    scale: 0.8,
    textureNameDef: "MapButtonOff",
    textureOver: "MapButton",
    textureClick: "MapButton",
};

export const button2: ButtonParams = {
    x: 640,
    y: 350,
    scale: 0.8,
    textureNameDef: "MapButtonOff",
    textureOver: "MapButton",
    textureClick: "MapButton",
};

export const button1Params: ButtonParams = {
    x: 625,
    y: 430,
    scale: 0.15,
    textureNameDef: "EMPTY_BUTTON",
    textureOver: "EMPTY_BUTTON",
    textureClick: "EMPTY_BUTTON",
};

export const button2Params: ButtonParams = {
    x: 625,
    y: 350,
    scale: 0.15,
    textureNameDef: "EMPTY_BUTTON",
    textureOver: "EMPTY_BUTTON",
    textureClick: "EMPTY_BUTTON",
};

export const mapUpParams: ButtonParams = {
    x: 1210,
    y: 320,
    scale: 0.4,
    textureNameDef: "UpDown",
    textureOver: "UpDown",
    textureClick: "UpDown",
};

export const mapDownParams: ButtonParams = {
    x: 1210,
    y: 400,
    scale: -0.4,
    textureNameDef: "UpDown",
    textureOver: "UpDown",
    textureClick: "UpDown",
};

export const buttonCloseParams: ButtonParams = {
    x: 625,
    y: 520,
    alpha: 0,
    scale: 0.15,
    textureNameDef: "EMPTY_BUTTON",
    textureOver: "EMPTY_BUTTON",
    textureClick: "EMPTY_BUTTON",
};

export const shieldCloseParams: ButtonParams = {
    x: 880,
    y: 135,
    scale: 0.08,
    textureNameDef: "minus",
    textureOver: "minus",
    textureClick: "minus",
};

export const configParams: ButtonParams = {
    textureNameDef: "EMPTY_BUTTON",
    textureOver: "EMPTY_BUTTON",
    textureClick: "EMPTY_BUTTON",
    x: 650,
    y: 600,
    scale: 0.2,
};

export const startParams: ButtonParams = {
    textureNameDef: "EMPTY_BUTTON",
    textureOver: "EMPTY_BUTTON",
    textureClick: "EMPTY_BUTTON",
    x: 450,
    y: 600,
    scale: 0.2,
};

export const textSceneParams: ButtonParams = {
    textureNameDef: "EMPTY_BUTTON" ,
    textureOver: "EMPTY_BUTTON" ,
    textureClick: "EMPTY_BUTTON"  ,
    x: 850,
    y: 600,
    scale: 0.2,
};