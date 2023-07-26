import { BUTTON_SCALE, MOVEMENTS_SCALE, START_SCALE, UI_CONFIG, UI_SCALE } from "./constants";

export type ButtonParams = {
    x: number,
    y: number,
    scale: number,
    textureName: string;
    textureClickName: string;
};

export const configButtonGame: ButtonParams = {
    x: 650,
    y: 500,
    scale: UI_CONFIG,
    textureName: "CONFIG.png",
    textureClickName: "CONFIG hundido.png"
};

export const buttonsOff: ButtonParams = {
    x: 1070,
    y: 40,
    scale: UI_SCALE,
    textureName: "lineDark28.png",
    textureClickName: "lineLight31.png"
};

export const buttonsOn: ButtonParams = {
    x: 1070,
    y: 40,
    scale: UI_SCALE,
    textureName: "lineDark28.png",
    textureClickName: "lineLight31.png"
};

export const buttonA: ButtonParams = {
    x: 980,
    y: 540,
    scale: BUTTON_SCALE,
    textureName: "lineDark31.png",
    textureClickName: "lineDark34.png"
};

export const buttonB: ButtonParams = {
    x: 1120,
    y: 430,
    scale: BUTTON_SCALE,
    textureName: "lineDark32.png",
    textureClickName: "lineDark32.png"
};

export const pauseOn: ButtonParams = {
    x: 1230,
    y: 40,
    scale: UI_SCALE,
    textureName: "lineDark28.png",
    textureClickName: "lineDark28.png"
};

export const pauseOff: ButtonParams = {
    x: 1230,
    y: 40,
    scale: UI_SCALE,
    textureName: "lineDark28.png",
    textureClickName: "lineDark28.png"
};

export const moveUp: ButtonParams = {
    x: 180,
    y: 440,
    scale: MOVEMENTS_SCALE,
    textureName: "lineDark48.png",
    textureClickName: "lineLight01.png"
};

export const moveDown: ButtonParams = {
    x: 180,
    y: 620,
    scale: MOVEMENTS_SCALE,
    textureName: "lineDark05.png",
    textureClickName: "lineLight08.png"
};
export const moveRight: ButtonParams = {
    x: 260,
    y: 530,
    scale: MOVEMENTS_SCALE,
    textureName: "lineDark01.png",
    textureClickName: "lineLight04.png"
};
export const moveLeft: ButtonParams = {
    x: 100,
    y: 530,
    scale: MOVEMENTS_SCALE,
    textureName: "lineDark00.png",
    textureClickName: "lineLight03.png"
};

export const start: ButtonParams = {
    x: 1130,
    y: 580,
    scale: START_SCALE,
    textureName: "lineDark44.png",
    textureClickName: "lineLight47.png"
};
