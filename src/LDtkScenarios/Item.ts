import { Rectangle, Sprite } from "pixi.js";
import type { FieldDef } from "./Player";
import { PhysicsContainer } from "../games/PhysicsContainer";

export interface ItemData {
	identifier: string;
	uid: number;
	tags: string[];
	exportToToc: boolean;
	allowOutOfBounds: boolean;
	doc: any;
	width: number;
	height: number;
	resizableX: boolean;
	resizableY: boolean;
	minWidth: any;
	maxWidth: any;
	minHeight: any;
	maxHeight: any;
	fieldInstances: any;
	keepAspectRatio: boolean;
	tileOpacity: number;
	fillOpacity: number;
	lineOpacity: number;
	hollow: boolean;
	color: string;
	renderMode: string;
	showName: boolean;
	tilesetId: number;
	tileRenderMode: string;
	tileRect: { tilesetUid: number; x: number; y: number; w: number; h: number };
	uiTileRect: any;
	nineSliceBorders: any[];
	maxCount: number;
	limitScope: string;
	limitBehavior: string;
	pivotX: number;
	pivotY: number;
	fieldDefs: FieldDef[];
}

export class Item extends PhysicsContainer {
	public data: ItemData;
	constructor(data: ItemData, textureSource: string) {
		super();
		this.data = data;

		const itemImg = Sprite.from(textureSource);
		itemImg.scale.set(0.05);
		itemImg.anchor.set(0.5);
		this.addChild(itemImg);
	}

	public getHitBox(): Rectangle {
		return new Rectangle(this.x, this.y, this.width, this.height);
	}

	// public itemUpdate(): void { }
}
