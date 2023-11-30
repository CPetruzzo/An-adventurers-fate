import {
    // Container, 
    DisplayObject
} from "pixi.js";
import { Easing, Tween } from "tweedle.js";

export interface PopUpParams {
    name: string,
    objectsToRemove: any[][], // Antes eran DisplayObject yo se lo saque para poder usar width y height
    objectsToAdd: any[][],
    context: any,
    popups: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][] } }
}

export function createPopUp(
    name: string,
    objectsToRemove: any[][],
    objectsToAdd: any[][],
    // objectsToRemove: DisplayObject[][],
    // objectsToAdd: DisplayObject[][],
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
            new Tween(obj).from({ alpha: 1 }).to({ alpha: 0 }, 500).start().onComplete(() => {
                context.removeChild(obj);
            });
        });
    });

    objectsToAdd.forEach((group) => {
        group.forEach((obj) => {
            context.addChild(obj);
            // obj.pivot.set(obj.width, obj.height)
            obj.alpha = 0;
            new Tween(obj).from({ scale: { x: 0, y: 0 } }).to({ scale: { x: obj.scale.x, y: obj.scale.y }, alpha: 1 }, 1000).easing(Easing.Elastic.InOut).start();
        });
    });
}

// // to change to: 
// export interface PopUpParams {
//     name: string,
//     objectsToRemove: any[][],
//     objectsToAdd: any[][],
//     context: any,
//     popups: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][] } }
// }

// export function createPopUp2(popUpParams: PopUpParams): void {
//     closeOpenedPopUps(popUpParams.popups, popUpParams.context);
//     if (!popUpParams.popups[popUpParams.name]) {
//         popUpParams.popups[popUpParams.name] = {
//             objectsToAdd: popUpParams.objectsToAdd,
//             objectsToRemove: popUpParams.objectsToRemove,
//         };
//     }

//     popUpParams.objectsToRemove.forEach((group) => {
//         group.forEach((obj) => {
//             popUpParams.context.removeChild(obj);
//         });
//     });

//     popUpParams.objectsToAdd.forEach((group) => {
//         group.forEach((obj) => {
//             popUpParams.context.addChild(obj);
//         });
//     });
// }
// ///

export function closePopUp(
    name: string,
    context: any,
    popups: { [name: string]: { objectsToRemove: DisplayObject[][]; objectsToAdd: DisplayObject[][] } }
): void {
    if (popups[name]) {
        const { objectsToAdd, objectsToRemove } = popups[name];
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