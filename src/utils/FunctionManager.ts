import { Sprite, Text, Texture } from "pixi.js";
import { PointButton } from "../ui/PointButton";
import { Player } from "../games/Player";
import { LETRA3 } from "./constants";

/** Use a function to create Sprites with common parameters
 * @param params parameters for that sprite
 */
export function createSprite(params: SpriteParams): Sprite {
    const sprite = new Sprite(Texture.from(params.texture));
    sprite.position.set(params.position.x, params.position.y);
    sprite.scale.set(params.scale.x, params.scale.y);

    if (params.anchor) {
        sprite.anchor.set(params.anchor.x, params.anchor.y);
    }

    return sprite;
}

export interface SpriteParams {
    texture: string;
    position: { x: number; y: number };
    scale: { x: number; y: number };
    anchor?: { x: number; y: number };
    alpha?: number
}

/** Use a function to create PointButtons with common parameters
 * @param params parameters for that pointerbutton, x, y, scale, texture def, over, down
 * @param _event name of the event, for example, pointer down
 * @param _callback void function that's applyied when the pointerbutton launches it's event
 */
export function createPointButton(params: ButtonParams, event: string | symbol, fn: VoidFunction, context?: any, text?: string): PointButton {
    const button = new PointButton(
        Texture.from(params.textureNameDef),
        Texture.from(params.textureOver),
        Texture.from(params.textureClick)
    );
    button.x = params.x;
    button.y = params.y;
    button.scale.set(params.scale);

    if (text) {
        const texto = new Text(text, LETRA3);
        texto.anchor.set(0.5);
        button.addChild(texto);
    }

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
};

export function getPlayerHeight(): number {
    if (Player.height == null) {
        Player.height = 45;
    }
    return Player.height;
}

export function setValue(key: string, value: string): void {
    localStorage.setItem(key, value)
  }
  
  export function getValue(key: string): any {
    return localStorage.getItem(key);
  }
  