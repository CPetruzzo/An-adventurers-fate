import { 
    // Container, 
    DisplayObject } from "pixi.js";

export function createPopUp(
    name: string,
    objectsToRemove: DisplayObject[][],
    objectsToAdd: DisplayObject[][],
    context: any,
    popups: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][] } }
): void {
    closeOpenedPopUps(popups, context);
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

export function closePopUp(
    name: string,
    context: any,
    popups: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][] } }
): void {
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

        delete popups[name];
    }
}

export function openedPopUps(popups: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][] } }): void {
    const openPopUps = Object.keys(popups);

    if (openPopUps.length > 0) {
        console.log("Pop-ups abiertos:");
        openPopUps.forEach((name) => {
            console.log(name);
        });
    } else {
        console.log("No hay pop-ups abiertos.");
    }
}

export function closeOpenedPopUps(popups: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][] } }, context: any): void {
    const openPopUps = Object.keys(popups);

    openPopUps.forEach((name) => {
        closePopUp(name, context, popups);
    });
}