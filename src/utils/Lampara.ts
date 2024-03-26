import { Sprite, Graphics, filters, Point } from "pixi.js";

export class Lampara extends Sprite {
    private light: Graphics;
    private lightColor: number;
    private lightRadius: number;
    private lightIntensity: number;
    private lightFilter: any;

    constructor(lightColor: number = 0xffff00, lightRadius: number = 100, lightIntensity: number = 0.5) {
        super();

        this.lightColor = lightColor;
        this.lightRadius = lightRadius;
        this.lightIntensity = lightIntensity;

        this.light = new Graphics();
        this.addChild(this.light);

        this.lightFilter = new filters.ColorMatrixFilter();
        this.light.filters = [this.lightFilter];

        this.updateLight();
    }

    public updatePosition(x: number, y: number): void {
        this.position.set(x, y);
        this.updateLight();
    }

    public setLightColor(color: number): void {
        this.lightColor = color;
        this.updateLight();
    }

    public setLightIntensity(intensity: number): void {
        this.lightIntensity = intensity;
        this.updateLight();
    }

    public setLightRadius(radius: number): void {
        this.lightRadius = radius;
        this.updateLight();
    }

    private updateLight(): void {
        this.light.clear();

        // Calculamos la intensidad de la luz en función de la distancia radial
        const center = new Point(this.width * 0.5, this.height * 0.5);

        // Gradiente de intensidad más suave para un degradado gradual
        const gradient = this.lightIntensity / this.lightRadius;
        console.log('gradient', gradient)

        for (let r = 0; r <= this.lightRadius; r++) {
            const alpha = 1 - gradient * Math.pow(r, 2);
            console.log('alpha', alpha)
            const color = (this.lightColor & 0xffffff) + (Math.round(255 * alpha) << 24); // Aplicar el canal alfa
            console.log('color', color)

            this.light.beginFill(color, alpha);
            this.light.drawCircle(center.x, center.y, r);
            this.light.endFill();
        }
    }
}
