/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Sprite, Texture } from "pixi.js";
import { PhysicsContainer } from "../games/PhysicsContainer";

export interface FieldDef {
	identifier: string;
	doc: any;
	__type: string;
	uid: number;
	type: string;
	isArray: boolean;
	canBeNull: boolean;
	arrayMinLength: any;
	arrayMaxLength: any;
	editorDisplayMode: string;
	editorDisplayScale: number;
	editorDisplayPos: string;
	editorLinkStyle: string;
	editorDisplayColor: any;
	editorAlwaysShow: boolean;
	editorShowInWorld: boolean;
	editorCutLongValues: boolean;
	editorTextSuffix: any;
	editorTextPrefix: any;
	useForSmartColor: boolean;
	exportToToc: boolean;
	searchable: boolean;
	min: number;
	max: number;
	regex: any;
	acceptFileTypes: any;
	defaultOverride: { id: string; params: any[] };
	textLanguageMode: any;
	symmetricalRef: boolean;
	autoChainRef: boolean;
	allowOutOfLevelRef: boolean;
	allowedRefs: string;
	allowedRefsEntityUid: any;
	allowedRefTags: string[];
	tilesetUid: any;
}

export interface PlayerData {
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

export class Player extends PhysicsContainer {
	public static readonly BUNDLES = ["sfx"];
	public data: PlayerData;
	public playerImg: Sprite;

	constructor(data: PlayerData) {
		super();
		this.data = data;

		const idleTextureArray = [];
		for (let i = 1; i < 3; i++) {
			const texture = Texture.from(`./img/JuanIdle${i}.png`);
			idleTextureArray.push(texture);
		}
		const atkTextureArray = [];
		for (let i = 1; i < 3; i++) {
			const texture = Texture.from(`./img/JuanAtk${i}.png`);
			atkTextureArray.push(texture);
		}

		this.playerImg = Sprite.from("./img/cheers1.png");
		this.playerImg.scale.set(0.02);
		this.playerImg.anchor.set(0.5);
		this.playerImg.alpha = 0;

		this.addChild(this.playerImg);

	}

	public playerUpdate(dt: number): void {
		super.update(dt);
		this.handleMovement();
	}

	/** movement function */
	private handleMovement(): void {
		this.stopMovement();
	}

	/** detection of player with collisions array (from TileMap collision tiles) */
	public detectCollision(collisions: any[], _allowCollide?: boolean): boolean {
		const playerBounds = this.playerImg.getBounds();
		const playerLeft = playerBounds.x;
		const playerRight = playerBounds.x + playerBounds.width;
		const playerTop = playerBounds.y;
		const playerBottom = playerBounds.y + playerBounds.height;

		let collisionDetected = false;

		for (const collisionSprite of collisions) {
			const collisionBounds = collisionSprite.getBounds();
			const collisionLeft = collisionBounds.x;
			const collisionRight = collisionBounds.x + collisionBounds.width;
			const collisionTop = collisionBounds.y;
			const collisionBottom = collisionBounds.y + collisionBounds.height;

			const intersectX = playerRight > collisionLeft && playerLeft < collisionRight;
			const intersectY = playerBottom > collisionTop && playerTop < collisionBottom;

			if (!_allowCollide) {
				// console.log("_allowCollide", _allowCollide);
				if (intersectX && intersectY) {
					// Hay colisión en ambos ejes, determinar en qué dirección es más grande la intersección
					const overlapX = Math.min(playerRight, collisionRight) - Math.max(playerLeft, collisionLeft);
					const overlapY = Math.min(playerBottom, collisionBottom) - Math.max(playerTop, collisionTop);

					if (overlapX < overlapY) {
						// La intersección es mayor en el eje X
						const adjustX = playerRight < collisionRight ? -overlapX : overlapX;
						this.x += adjustX;
					} else {
						// La intersección es mayor en el eje Y
						const adjustY = playerBottom < collisionBottom ? -overlapY : overlapY;
						this.y += adjustY;
					}

					collisionDetected = true;
					break;
				}
			}
		}

		return collisionDetected;
	}

	public stopMovement(): void {
		// Reiniciar la velocidad del jugador
		this.speed.x = 0;
		this.speed.y = 0;
	}
}
