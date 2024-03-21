import { Slope } from "../games/IHitBox";
import { Potion } from "../games/Potion";
import { LevelBaseScene } from "../utils/LevelBaseScene";

export class LDTKScene1 extends LevelBaseScene {
    constructor() {
        super(1);

        this.loadLevelData();
        this.player.position.set(550, 550);

        this.slopes = [];
        for (let i = 0; i < 5; i++) {
            const slope = new Slope(200, 50, 22);
            slope.position.set(3250 + i * 30, 625 + i * 10)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

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