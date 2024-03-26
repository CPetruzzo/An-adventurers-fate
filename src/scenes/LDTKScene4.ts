import {
    // Filter, 
    Sprite,
    // filters
} from "pixi.js";
import { Potion } from "../games/Potion";
import { LevelBaseScene } from "../utils/LevelBaseScene";
import { SceneManager } from "../utils/SceneManager";
import { Slope } from "../games/IHitBox";

export class LDTKScene4 extends LevelBaseScene {
    private levelColumns: Sprite;
    // private glowFilter: Filter;

    constructor() {
        super(4);

        this.levelColumns = Sprite.from(`Level_4`);
        const screenRelation = SceneManager.HEIGHT / (this.levelColumns.height / 2);
        this.levelColumns.scale.set(screenRelation);
        this.world.addChild(this.levelColumns);

        this.loadLevelData();

        this.slopes = [];
        for (let i = 0; i < 6; i++) {
            const slope = new Slope(200, 50, 22);
            slope.position.set(7000 + i * 30, 1300 + i * 10)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        this.player.position.set(6300, 1250);

        // this.glowFilter = new filters.DisplacementFilter(this.levelColumns); // cool for doing window glases
        // this.player.filters = [this.glowFilter];

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
        this.updateParallax();
    }

    public updateParallax(): void {
        const parallaxFactor = 0.1;
        const displacementX = this.player.x * parallaxFactor;
        this.levelColumns.x = -displacementX;
    }

}