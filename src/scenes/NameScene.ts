import { sound } from "@pixi/sound";
import { Text, Texture } from "pixi.js";
import { PointButton } from "../ui/PointButton";
import { IUpdateable } from "../utils/IUpdateable";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { MapScene } from "./MapScene";

export class NameScene extends SceneBase implements IUpdateable{

    private textoViejo: Text;
    public characterName: string;
    private start: PointButton;

    constructor() {
        super();

        let texto = prompt("Introduce tu nombre");
        if (texto != null) {
            this.characterName=texto;
            this.textoViejo = new Text(this.characterName, { fontFamily: "Arial", fontSize: 48, fill:  0xAA0000 });
        } else {
            this.characterName="Jugador";
            this.textoViejo = new Text(this.characterName, { fontFamily: "Arial", fontSize: 48, fill:  0xAA0000 });
        }
        this.textoViejo.x = 300;
        this.textoViejo.y = 120;
        
        this.start= new PointButton(Texture.from("START.png"),
        Texture.from("START hundido.png"),
        Texture.from("START.png"))
        this.start.x = 650
        this.start.y = 400
        this.start.scale.x=0.5;
        this.start.scale.y=0.5;
        this.start.on("pointerClick", this.onStartClick, this)

        this.addChild(this.start);
    }

    public update(): void {
    }

    onStartClick(): void {
        console.log("Apreté Config", this);
        SceneManager.changeScene(new MapScene());
        sound.stop("StartBGM");
    }
    

}