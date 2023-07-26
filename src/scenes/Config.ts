// import { sound } from "@pixi/sound";
import { Sprite, Text, Texture } from "pixi.js";
// import { Tween } from "tweedle.js";
// import Typed from "typed.js";
import { PointButton } from "../ui/PointButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameStartScene } from "./GameStartScene";
import { LETRA1, LETRA1SUBTITLE, LETRA1TITLE } from "../utils/constants";

export class Config extends SceneBase {
    private buttonMouse: PointButton;
    public mostrarEscrito: boolean = false;
    private settings: Sprite;
    private title: Text;
    private control1: Text;
    private control2: Text;
    private control3: Text;
    private control4: Text;
    private control5: Text;
    private control6: Text;
    private control7: Text;

    constructor() {
        super();
        this.settings = Sprite.from("B6");

        this.buttonMouse = new PointButton(Texture.from("BACK.png"),
            Texture.from("BACK hundido.png"),
            Texture.from("BACK.png"));
        this.buttonMouse.x = 650
        this.buttonMouse.y = 670
        this.buttonMouse.scale.x = 0.5;
        this.buttonMouse.scale.y = 0.5;
        this.buttonMouse.on("pointerClick", this.onButtonClick, this);

        this.title = new Text("Settings", LETRA1TITLE);
        this.title.position.set(520, 100);

        this.control1 = new Text("Movement:", LETRA1SUBTITLE);
        // this.control1.style.fontSize = 35;
        this.control1.position.set(150, 320);

        this.control2 = new Text("Jump: KeyW / click Main hability", LETRA1);
        this.control2.position.set(600, 400);

        this.control3 = new Text("Crawl: KeyS / click arrowDown", LETRA1);
        this.control3.position.set(150, 480);

        this.control4 = new Text("Left: KeyA / click arrowLeft", LETRA1);
        this.control4.position.set(150, 560);

        this.control5 = new Text("Right: KeyD / click arrowRight", LETRA1);
        this.control5.position.set(150, 400);

        this.control6 = new Text("Punch: KeyJ / click button A", LETRA1);
        this.control6.position.set(600, 480);

        this.control7 = new Text("Range Attack: KeyK / click button B", LETRA1);
        this.control7.position.set(600, 560);


        this.addChild(
            this.settings,
            this.title,
            this.control1,
            this.control2,
            this.control3,
            this.control4,
            this.control5,
            this.control6,
            this.control7,
            this.buttonMouse,
        )

        // this.buttonText = new PointButton(Texture.from("BACK.png"),
        //     Texture.from("BACK hundido.png"),
        //     Texture.from("BACK.png"));
        // this.buttonText.x = 20
        // this.buttonText.y = 50
        // this.buttonText.scale.x = 0.5;
        // this.buttonText.scale.y = 0.5;
        // this.buttonText.on("pointerClick", this.onButtonText, this);

        //     // NOMBRE DEL JUGADOR
        // let texto = prompt("Introduce tu nombre");
        // if (texto!=null){
        // // this.textoViejo = new BitmapText(texto, { fontName: "Supertext02" });
        // } else {
        //     // this.textoViejo = new BitmapText("Jugador", { fontName: "Supertext02" });
        // }

        // { // ADD.CHILD:             AGREGANDO TODO CON ADDCHILDS
        //     this.addChild(this.buttonMouse, this.buttonText);
        // }
    }


    public update(): void {

        // console.log(this.aux.innerHTML);
    }

    //BUTTON.TS            HACER FUNCIONAR EL NUEVO BOTÓN  
    private onButtonClick(): void {
        console.log("Apreté volver", this);
        SceneManager.changeScene(new GameStartScene());
    }

    // private onButtonText() {
    //     this.mostrarEscrito = true;
    //     console.log("apreté el texto")
    //     console.log(this.mostrarEscrito);
    //     const texto: string = "Hola, soy un texto";
    //     const subtexto = texto.substring(0, texto.length);

    //     if (this.mostrarEscrito=true) {
    //         console.log("mostrando escrito");

    //         for (let i = 0; i < subtexto.length; i++) {
    //             new Tween(subtexto[i])
    //             .from({ x: 200 })
    //             .to({ x: 700 }, 3000)
    //             .start()
    //             .onComplete(this.Waiting.bind(this));
    //             console.log(subtexto[i]);
    //             sound.play("PotionSound1");
    //         }
    //     }


    // }




    // codigo para escribir letras de un texto una por una

    //         const textoescrito = new Text(subtexto[i], {
    //             fontFamily: "Arial",
    //             fontSize: "50px",
    //             fill: "white",
    //             align: "center",
    //             wordWrap: true,
    //             lineHeight: 50,
    //             padding: 10,
    //             stroke: "black",
    //             strokeThickness: 5,
    //             dropShadow: true,
    //             dropShadowColor: "black",
    //             dropShadowBlur: 4,
    //             dropShadowAngle: Math.PI / 6,
    //             dropShadowDistance: 6,
    //             wordWrapWidth: this.width - 100,
    //         });
    //         this.addChild(textoescrito);
    //         textoescrito.position.set(200,200);
    //     }
    // }


    // private soundText() {
    //     sound.play("PotionSound1");
    // }

    // private Waiting(): void {
    //     console.log("waiting");  
    //     new Tween(this.buttonText).to({}, 3000).start();
    //     this.soundText();

    // }


}

    // private aux: HTMLDivElement;


// let str:string= "Hola, soy un texto que va a ser mostrado en pantalla.\n"
// let currentText = new Tween(this.str.substring(0, str.length-1)).to({},3000).start();
// this.textOnScreen = new Text(`${currentText}`, { fontSize: 40, fontFamily: ("Arial") });
// this.addChild(this.textOnScreen);

// this.addChild(str);

        // this.aux= document.createElement("div");
        // const text = new Typed(this.aux, {
        //     strings: [subtexto],
        //     typeSpeed: 50,
        //     loop: false,
        //     showCursor: false,
        //     startDelay: 1000,
        //     onStringTyped: () => {
        //         console.log("String typed");
        //     }
        //  });
        //  text.start();