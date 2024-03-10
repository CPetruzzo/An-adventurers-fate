import { Container } from "@pixi/display";
import { EntitiesCreator } from "./EntitiesCreator";
import { Map } from "./TileMap";
import { BaseTexture } from "@pixi/core";

export class LevelCreator extends Container {
	public static readonly BUNDLES = ["img"];

	public levelEntities: EntitiesCreator;

	public readonly mapData: Map;
	public mapa: Map;

	constructor(jsonData: any, lvlNmbr: number) {
		super();
		this.mapData = jsonData;
		this.mapa = new Map(this.mapData, lvlNmbr);
		this.mapa.makeMap(BaseTexture.from("../static/LDTKassets/Tiles.png"), 16, lvlNmbr);
		this.mapa = new Map(this.mapData, lvlNmbr);
		// this.mapa.pivot.set(this.mapa.width / 2, this.mapa.height / 2);
		this.levelEntities = new EntitiesCreator(this.mapData);
		this.addChild(this.mapa, this.levelEntities);
	}
}
