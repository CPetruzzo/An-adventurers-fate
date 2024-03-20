import { Slope } from "../games/IHitBox";
import { Potion } from "../games/Potion";
import { LevelBaseScene } from "../utils/LevelBaseScene";

export class LDTKScene3 extends LevelBaseScene {
    constructor() {
        super(3);

        this.loadLevelData();

        this.chest.position.set(6650, 550);
        
        this.slopes = [];
        for (let i = 0; i < 2; i++) {
            const slope = new Slope(280, 50, -20);
            slope.position.set(1115 + i * 30, 621 + i * 30)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        for (let i = 0; i < 2; i++) {
            const slope = new Slope(200, 50, -22);
            slope.position.set(1400 + i * 50, 350 - i * 50)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        for (let i = 0; i < 5; i++) {
            const slope = new Slope(200, 50, 22);
            slope.position.set(1550 + i * 30, 280 + i * 10)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        for (let i = 0; i < 5; i++) {
            const slope = new Slope(200, 50, 22);
            slope.position.set(1870 + i * 30, 375 + i * 10)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        for (let i = 0; i < 4; i++) {
            const slope = new Slope(200, 50, 22);
            slope.position.set(2155 + i * 30, 450 + i * 10)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        for (let i = 0; i < 4; i++) {
            const slope = new Slope(200, 50, 22);
            slope.position.set(2495 + i * 30, 535 + i * 10)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        for (let i = 0; i < 4; i++) {
            const slope = new Slope(200, 50, 22);
            slope.position.set(2785 + i * 30, 620 + i * 10)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        for (let i = 0; i < 5; i++) {
            const slope = new Slope(200, 50, -12);
            slope.position.set(3400 + i * 30, 330 - i * 5)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        for (let i = 0; i < 4; i++) {
            const slope = new Slope(200, 50, 22);
            slope.position.set(3950 + i * 30, 310 + i * 10)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        for (let i = 0; i < 2; i++) {
            const slope = new Slope(280, 50, -20);
            slope.position.set(1115 + i * 30, 621 + i * 30)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        for (let i = 0; i < 5; i++) {
            const slope = new Slope(200, 50, -25);
            slope.position.set(4920 + i * 30, 645 - i * 5)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        for (let i = 0; i < 5; i++) {
            const slope = new Slope(200, 50, -25);
            slope.position.set(7100 + i * 30, 642 - i * 5)
            this.slopes.push(slope);
            this.world.addChild(slope);
        };

        for (let i = 0; i < 4; i++) {
            const slope = new Slope(200, 50, 22);
            slope.position.set(5800 + i * 30, 620 + i * 10)
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