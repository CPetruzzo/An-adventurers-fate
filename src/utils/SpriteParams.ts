import { Sprite, Texture } from "pixi.js";
import { book, menuBag, shield } from "./ButtonParams";

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
// SpriteParams para los sprites mencionados en el ejemplo

export const bagBG: SpriteParams = {
    texture: "itemBG",
    position: { x: menuBag.x, y: menuBag.y + 5 },
    scale: { x: 0.17, y: 0.17 },
    alpha: 0.5,
    anchor: { x: 0.5, y: 0.5 }
};

export const shieldBG: SpriteParams = {
    texture: "itemBG",
    position: { x: shield.x, y: shield.y + 15 },
    scale: { x: 0.17, y: 0.17 },
    alpha: 0.5,
    anchor: { x: 0.5, y: 0.5 }
};

export const bookBG: SpriteParams = {
    texture: "itemBG",
    position: { x: book.x, y: book.y + 5 },
    scale: { x: 0.17, y: 0.17 },
    alpha: 0.5,
    anchor: { x: 0.5, y: 0.5 }
};

export const mapParams: SpriteParams = {
    texture: "Map1",
    position: { x: 0, y: 0 },
    scale: { x: 1, y: 1 },
};

export const nombreParams: SpriteParams = {
    texture: "nombreMarco",
    position: { x: 225, y: 100 },
    scale: { x: 0.7, y: 0.7 },
};

export const pieParams: SpriteParams = {
    texture: "pie",
    position: { x: 225, y: 500 },
    scale: { x: 0.7, y: 0.7 },
};

export const backShieldParams: SpriteParams = {
    texture: "backShield",
    position: { x: 320, y: 60 },
    scale: { x: 0.9, y: 0.9 },
};

export const itemWeapon4Params: SpriteParams = {
    texture: "itemShield",
    position: { x: 700, y: 240 },
    scale: { x: 0.25, y: 0.25 },
    anchor: { x: 0.5, y: 0.5 },
};

export const itemWeapon1Params: SpriteParams = {
    texture: "itemShield",
    position: { x: 540, y: 240 },
    scale: { x: 0.25, y: 0.25 },
    anchor: { x: 0.5, y: 0.5 },
};

export const itemWeapon2Params: SpriteParams = {
    texture: "itemShield",
    position: { x: 540, y: 420 },
    scale: { x: 0.25, y: 0.25 },
    anchor: { x: 0.5, y: 0.5 },
};

export const itemWeapon3Params: SpriteParams = {
    texture: "itemShield",
    position: { x: 700, y: 420 },
    scale: { x: 0.25, y: 0.25 },
    anchor: { x: 0.5, y: 0.5 },
};

export const itemBowParams: SpriteParams = {
    texture: "itemBow",
    position: { x: itemWeapon1Params.position.x, y: itemWeapon1Params.position.y },
    scale: { x: 0.07, y: 0.07 },
    anchor: { x: 0.5, y: 0.5 },
};

export const itemSwordParams: SpriteParams = {
    texture: "itemSword",
    position: { x: itemWeapon2Params.position.x, y: itemWeapon2Params.position.y },
    scale: { x: 0.07, y: 0.07 },
    anchor: { x: 0.5, y: 0.5 },
};

export const bookOpenedParams: SpriteParams = {
    texture: "BookOpened",
    position: { x: 150, y: 50 },
    scale: { x: 0.7, y: 0.7 },
};

export const cartelParams: SpriteParams = {
    texture: "EMPTY_BANNER",
    position: { x: 370, y: 100 },
    scale: { x: 0.5, y: 0.5 },
};

export const pointOnMapParams: SpriteParams = {
    texture: "lineLight26.png",
    position: { x: 250, y: 100 },
    scale: { x: 0.8, y: 0.8 },
};

export const pointOnMap2Params: SpriteParams = {
    texture: "lineLight26.png",
    position: { x: 645, y: 150 },
    scale: { x: 0.8, y: 0.8 },
};

export const pointOnMap3Params: SpriteParams = {
    texture: "lineLight26.png",
    position: { x: 990, y: 400 },
    scale: { x: 0.8, y: 0.8 },
};

export const pointOnMap4Params: SpriteParams = {
    texture: "lineLight26.png",
    position: { x: 70, y: 450 },
    scale: { x: 0.8, y: 0.8 },
};

export const playerParams: SpriteParams = {
    texture: "PlayerMap",
    anchor: {x: 0.5, y: 0.5},
    scale: { x: 0.45, y: 0.45 },
    position: { x: 780, y: 350 },
};

export const marcoTopLeftParams: SpriteParams = {
    texture: "MarcoMap",
    scale: { x: -0.4, y: 0.4 },
    position: { x: 400, y: 200 },
};

export const marcoBottomRightParams: SpriteParams = {
    texture: "MarcoMap",
    scale: { x: 0.4, y: -0.4 },
    position: { x: 400, y: 500 },
};
