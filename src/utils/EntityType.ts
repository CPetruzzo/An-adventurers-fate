/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Item } from "../LDtkScenarios/Item";
import { Player } from "../LDtkScenarios/Player";


export interface EntityType {
	__identifier: string;
	iid?: any;
	px0?: any;
	px1?: any;
	width?: any;
	height?: any;
	__pivot0?: any; 
	
	__pivot1?: any;
	__tile?: any;
	fieldInstances?: any;
}

export function createEntityInstance(data: any): any {
	switch (data.__identifier) {
		case "Player":
			console.log(`new ${data.__identifier}`);
			return new Player(data);
		case "Door":
			console.log(`new ${data.__identifier}`);
			break;
		case "Button":
			console.log(`new ${data.__identifier}`);
			break;
		case "Item":
			switch (data.fieldInstances[0].__value) {
				case "Health":
					return new Item(data, "./img/Potion.png");
				case "Rifle":
					return new Item(data, "./img/rifle.png");
				default:
					return new Item(data, "./img/cheers1.png");
			}
		case "SecretWall":
			console.log(`new ${data.__identifier}`);
			break;
		default:
			console.log(`Tipo de entidad no reconocido: ${data.__identifier}`);
			return null;
	}
}

// Métodos para acceder a los campos
export function getIdentifier(data: any): string {
	return data.__identifier;
}

export function getWidth(data: any): number {
	return data.width;
}

export function getHeight(data: any): number {
	return data.height;
}

export function getColor(data: any): string {
	return data.color;
}

export function encontrarIndice(array: string[], elemento: string): number {
	return array.indexOf(elemento);
}
