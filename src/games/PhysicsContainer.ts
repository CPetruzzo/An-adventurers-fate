import { Container, Point } from "pixi.js";


export interface TerrainType {
    WATER: "WATER",
    GROUND: "GROUND",
}

export class PhysicsContainer extends Container {

    public speed: Point = new Point();

    public acceleration: Point = new Point();

    public update(deltaSeconds: number, _terrain?: string) {
        this.x += this.speed.x * deltaSeconds + 1 / 2 * this.acceleration.x * Math.pow(deltaSeconds, 2);
        this.y += this.speed.y * deltaSeconds + 1 / 2 * this.acceleration.y * Math.pow(deltaSeconds, 2)

        this.speed.x += this.acceleration.x * deltaSeconds;
 
        switch (_terrain) {
            case "WATER":
                this.speed.y -= this.acceleration.y * Math.random() * 0.15 * deltaSeconds;        
                break;
            default:
                this.speed.y += this.acceleration.y * deltaSeconds;
                break;
        }
    }
}