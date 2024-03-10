/* eslint-disable @typescript-eslint/naming-convention */

export interface LevelData {
	identifier: string;
	iid: string;
	worldX: number;
	worldY: number;
	pxWid: number;
	pxHei: number;
	fieldInstance: Array<any>;
	layerInstances: Array<LayerInstances>;
	neighbours?: Array<any>;
}

export interface LayerInstances {
	identifier: string;
	type: string;
	gridSize: number;
	tilesetRelPath: string;
	iid: string;
	entityInstances?: Array<EntityInstances>;
	autoLayerTiles?: any;
}

export interface EntityInstances {
	identifier: string;
	type: string;
	piv: Array<number>;
	tags: Array<string>;
	tile: Tile;
	iid: string;
	width: number;
	height: number;
	px: Array<number>;
	fieldInstances: any;
}

export interface Tile {
	tilesetUid: number;
	x: number;
	y: number;
	w: number;
	h: number;
}
export interface FieldInstances {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	__identifier: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	__value: any;
}
export interface RealEditorValues {
	id: string;
	params: Array<string>;
}
