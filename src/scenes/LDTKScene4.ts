import { Sprite } from "pixi.js";
import { Potion } from "../games/Potion";
import { LevelBaseScene } from "../utils/LevelBaseScene";
import { SceneManager } from "../utils/SceneManager";

export class LDTKScene4 extends LevelBaseScene {
    constructor() {
        super(4);

        const levelColumns = Sprite.from(`Level_4`);
        const screenRelation = SceneManager.HEIGHT / (levelColumns.height / 2);
        levelColumns.scale.set(screenRelation);
        this.world.addChild(levelColumns);

        this.loadLevelData();

        this.player.position.set(500, 1250);

        this.chest.position.set(6650, 550);

        this.potions = [];
        const positions = [
            { x: 3520, y: 550 },
            { x: 4840, y: 440 },
        ];

        for (let i = 0; i < positions.length; i++) {
            const pot = new Potion("Potion", 200, 200);
            pot.scale.set(0.1);
            pot.position.set(positions[i].x, positions[i].y);
            this.world.addChild(pot);
            this.potions.push(pot);
        }
    }
    public override update(_deltaFrame: number): void {
        super.update(_deltaFrame);
    }
}