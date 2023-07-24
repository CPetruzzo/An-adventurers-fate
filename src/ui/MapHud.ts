import { Container, Texture } from "pixi.js";
import { PointButton } from "./PointButton";

export class MapHud extends Container {
    public shield: PointButton;
    constructor() {
        super();

        this.shield = new PointButton(Texture.from("ShieldOff"),
            Texture.from("Shield"),
            Texture.from("Shield"));
        this.shield.scale.set(0.25);
        this.shield.x = 240;
        this.shield.y = 640;
        this.shield.on("pointerClick", ()=>{
            this.onShieldClick()
        });
        this.addChild(this.shield);

    }

    private onShieldClick(): void {
        this.addChild(
            // this.backShield,
            // this.shieldClose,
            // this.itemWeapon4,
            // this.itemWeapon1,
            // this.itemWeapon2,
            // this.itemWeapon3,
        );
    }
}