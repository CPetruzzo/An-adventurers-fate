import { Container } from "@pixi/display";
import { createEntityInstance, getIdentifier } from "./EntityType";
import { CURRENT_LEVEL } from "./constants";

export class EntitiesCreator extends Container {
	public entities: Array<any> = [];
	public entityData: any;
	public dataName: string[] = [];

	constructor(levelData: any) {
		super();

		for (let i = 0; i < levelData.levels[CURRENT_LEVEL].layerInstances.length; i++) {
			for (let j = 0; j < levelData.levels[CURRENT_LEVEL].layerInstances[i].entityInstances.length; j++) {
				const entityData = levelData.levels[CURRENT_LEVEL].layerInstances[i].entityInstances[j];
				const entity = createEntityInstance(entityData);
				if (entity) {
					entity.position.set(entityData.px[0], entityData.px[1]);
					this.addChild(entity);
					this.entities.push(entity);

					const entityName = getIdentifier(entityData);
					this.dataName.push(entityName);
				}
			}
		}
	}
}
