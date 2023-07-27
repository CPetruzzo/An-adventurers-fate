import { sound } from "@pixi/sound";
import { Container } from "pixi.js";
import { Player } from "../games/Player";

export class LevelPoints extends Container {
    public static points: number = 0;
    public pointsMultiplier: number = 1.5;
    public currentLevel: number = 1;
    public static requiredPoints: number;
    private player: Player;

    constructor(player: Player) {
        super();
        this.player = player;

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
            this.player.increaseLevel(); // Aquí se llama al setter para actualizar las propiedades del jugador
            const winbgm = sound.find("ItemBGM");
            winbgm.volume = 0.1;
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


