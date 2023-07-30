import { DisplayObject } from "pixi.js";

export function createPopUp(name: string, objectsToRemove: DisplayObject[][], objectsToAdd: DisplayObject[][], context: any, popups: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][] } }): void {
    if (!popups[name]) {
        popups[name] = {
            objectsToAdd: objectsToAdd,
            objectsToRemove: objectsToRemove,
        };
    }

    objectsToRemove.forEach((group) => {
        group.forEach((obj) => {
            context.removeChild(obj);
        });
    });

    objectsToAdd.forEach((group) => {
        group.forEach((obj) => {
            context.addChild(obj);
        });
    });
}

export function closePopUp(name: string, context: any, popups: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][] } }): void {
    if (popups[name]) {
        const { objectsToAdd, objectsToRemove } = popups[name];
        objectsToAdd.forEach((group) => {
            group.forEach((obj) => {
                context.removeChild(obj);
            });
        });

        objectsToRemove.forEach((group) => {
            group.forEach((obj) => {
                context.addChild(obj);
            });
        });

        delete context.popUps[name];
    }
}