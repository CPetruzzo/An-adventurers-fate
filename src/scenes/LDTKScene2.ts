import { Slope } from "../games/IHitBox";
import { Potion } from "../games/Potion";
import { LevelBaseScene } from "../utils/LevelBaseScene";

export class LDTKScene2 extends LevelBaseScene {
    constructor() {
        super(2);

        this.loadLevelData();

        this.slopes = [];

        for (let i = 0; i < 2; i++) {
            const slope = new Slope(200, 50, -12);             
            slope.position.set(1100 + i * 30, 620 + i * 30)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        for (let i = 0; i < 1; i++) {
            const slope = new Slope(150, 30, -35);             
            slope.position.set(2250 + i * 30, 570 + i * 30)
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