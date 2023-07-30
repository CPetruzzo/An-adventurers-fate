import { Text, TextStyle } from "pixi.js";
import { LETRA2 } from "./constants";
import { Player } from "../games/Player";

export interface TextParams {
    text: string;
    style: TextStyle;
    position: { x: number; y: number };
}

export function createText(params: TextParams): Text {
    const { text, style, position } = params;
    const textObj = new Text(text, style);
    textObj.position.set(position.x, position.y);
    return textObj;
}

export const myTextParams: TextParams = {
    text: "Hello, world!",
    style: LETRA2,
    position: { x: 100, y: 200 },
};

export const PStrenghtParams: TextParams = {
    text: `Punch: ${Player._punchDamage}`,
    style: LETRA2,
    position: { x: 320, y: 325 },
};

export const BStrenghtParams: TextParams = {
    text: `Bow: ${Player._bowDamage}`,
    style: LETRA2,
    position: { x: 320, y: 375 },
};

export const salirParams: TextParams = {
    text: "¿Desea Salir?",
    style: LETRA2,
    position: { x: 548, y: 270 },
};

export const salirSiParams: TextParams = {
    text: "Si",
    style: LETRA2,
    position: { x: 615, y: 334 },
};

export const salirNoParams: TextParams = {
    text: "No",
    style: LETRA2,
    position: { x: 610, y: 400 },
};

export const levelParams: TextParams = {
    text: `Level: ${Player.getLevel()}`,
    style: LETRA2,
    position: { x: 350, y: 510 },
};

export const HpParams: TextParams = {
    text: `Max hp: ${Player._maxHealth}`,
    style: LETRA2,
    position: { x: 320, y: 275 },
};