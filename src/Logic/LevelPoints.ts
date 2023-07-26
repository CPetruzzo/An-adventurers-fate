import { sound } from "@pixi/sound";
import { Container } from "pixi.js";

export class LevelPoints extends Container {
    public static points: number = 0;
    public pointsMultiplier: number = 1.5;
    public currentLevel: number = 1;
    public static requiredPoints: number;

    constructor() {
        super();

        this.getCurrentLevel();
        console.log('this.getCurrentLevel()', this.getCurrentLevel())
    }

    increasePoints(amount: number): void {
        LevelPoints.points += amount;
        this.checkLevelUp();
    }

    private checkLevelUp(): void {
        LevelPoints.requiredPoints = Math.floor(1000 * Math.pow(this.pointsMultiplier, this.currentLevel - 1));
        if (LevelPoints.points >= LevelPoints.requiredPoints) {
            // LevelPoints.points -= LevelPoints.requiredPoints;
            this.currentLevel++;
            const winbgm = sound.find("ItemBGM");
            winbgm.volume = 0.2;
            winbgm.play();
            this.checkLevelUp();
        }
    }

    getCurrentLevel(): number {
        return this.currentLevel;
    }

    getPoints(): number {
        return LevelPoints.points;
    }
}


