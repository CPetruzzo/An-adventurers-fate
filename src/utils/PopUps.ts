import { DisplayObject, Sprite } from "pixi.js";
import { Easing, Tween } from "tweedle.js";
import { Timer } from "./SceneManager";

export interface PopUpParams {
    name: string,
    objectsToRemove: any[][], // Antes eran DisplayObject yo se lo saque para poder usar width y height
    objectsToAdd: any[][],
    context: any,
    popups: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][] } }
}

export enum PopUpsNames {
    PAUSE = "PAUSE",
    SHIELD = "SHIELD",
    BAG = "BAG",
    BOOK = "BOOK",
    BACKTOMENU = "BACKTOMENU",
}

export function createPopUp(
    name: string,
    objectsToRemove: any[][],
    objectsToAdd: any[][],
    context: any,
    background: Sprite, // Se agrega el fondo como un parámetro
    popups: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][]; background: Sprite } }
): void {
    closeOpenedPopUps(popups, context);

    background.width = context.width;
    background.height = context.height;
    background.interactive = true;
    background.alpha = 0;
    context.addChild(background);

    // Agregar event listener al background para cerrar el popup al hacer clic fuera de él
    background.on("pointerdown", () => {
        Timer(1000, () => closePopUp(name, context, popups));
    });


    if (!popups[name]) {
        popups[name] = {
            objectsToAdd: objectsToAdd,
            objectsToRemove: objectsToRemove,
            background: background
        };
    }

    objectsToRemove.forEach((group) => {
        group.forEach((obj) => {
            new Tween(obj).from({ alpha: 1 }).to({ alpha: 0 }, 500).start().onComplete(() => {
                context.removeChild(obj);
            });
        });
    });

    objectsToAdd.forEach((group) => {
        group.forEach((obj) => {
            context.addChild(obj);
            obj.alpha = 0;
            new Tween(obj).from({ scale: { x: 0, y: 0 } }).to({ scale: { x: obj.scale.x, y: obj.scale.y }, alpha: 1 }, 1000).easing(Easing.Elastic.InOut).start();
        });
    });
}

export function closePopUp(
    name: string,
    context: any,
    popups: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][]; background: Sprite } }
): void {
    if (popups[name]) {
        const { objectsToAdd, objectsToRemove, background } = popups[name]; // Se obtiene background desde popups[name]
        objectsToAdd.forEach((group) => {
            group.forEach((obj) => {
                new Tween(obj).from({ alpha: 1 }).to({ alpha: 0 }, 500).start().onComplete(() => {
                    context.removeChild(obj);
                });
            });
        });

        objectsToRemove.forEach((group) => {
            group.forEach((obj) => {
                obj.alpha = 1;
                context.addChild(obj);
            });
        });

        // Eliminar el fondo no interactivo
        context.removeChild(background); // Se utiliza background desde popups[name]

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

export function closeOpenedPopUps(popups: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][], background: Sprite } }, context: any): void {
    const openPopUps = Object.keys(popups);

    openPopUps.forEach((name) => {
        closePopUp(name, context, popups);
    });
}