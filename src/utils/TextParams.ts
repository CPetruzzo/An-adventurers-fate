import { Text, TextStyle } from "pixi.js";
import { LETRA2, LETRA4 } from "./constants";
import { Player } from "../games/Player";

// Función para obtener el nombre del jugador desde el almacenamiento local
export function getPlayerName(): string {
    const storedName = localStorage.getItem("playerName");
    let playerName: string;
    if (storedName === null || storedName === "") {
        playerName = prompt("Introduce tu nombre") || "Jugador";
        localStorage.setItem("playerName", playerName);
    } else {
        playerName = storedName;
    }
    return playerName;
}

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
    style: LETRA4,
    position: { x: 455, y: 270 },
};

export const salirSiParams: TextParams = {
    text: "Si",
    style: LETRA4,
    position: { x: 605, y: 330 },
};

export const salirNoParams: TextParams = {
    text: "No",
    style: LETRA4,
    position: { x: 600, y: 405 },
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