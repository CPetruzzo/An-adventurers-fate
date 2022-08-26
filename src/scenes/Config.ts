// import { sound } from "@pixi/sound";
import { Sprite, Text, TextStyle, Texture } from "pixi.js";
// import { Tween } from "tweedle.js";
// import Typed from "typed.js";
import { PointButton } from "../ui/PointButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameStartScene } from "./GameStartScene";


export class Config extends SceneBase {

    // private buttonText: PointButton;
    private buttonMouse: PointButton;

    public mostrarEscrito: boolean = false;
    public settings: Sprite;
    public title: Text;
    public control1: Text;
    control2: Text;
    control3: Text;
    control4: Text;
    control5: Text;
    control6: Text;
    control7: Text;
    // public textoViejo: BitmapText;

    constructor() {
        super();

        const TangerineTitle = new TextStyle({ fontFamily: "Tangerine", fontSize: 130, fill: 0X1819 });
        const Tangerine = new TextStyle({ fontFamily: "Tangerine", fontSize: 48, fill: 0X1819 });


        this.settings = Sprite.from("B6");

        this.buttonMouse = new PointButton(Texture.from("BACK.png"),
            Texture.from("BACK hundido.png"),
            Texture.from("BACK.png"));
        this.buttonMouse.x = 650
        this.buttonMouse.y = 670
        this.buttonMouse.scale.x = 0.5;
        this.buttonMouse.scale.y = 0.5;
        this.buttonMouse.on("pointerClick", this.onButtonClick, this);

        
        this.title = new Text("Settings", TangerineTitle);
        this.title.position.set(520, 100);
        
        this.control1 = new Text("Movement:", Tangerine);
        this.control1.position.set(150, 320);

        this.control2 = new Text("Jump: KeyW / click Main hability", Tangerine);
        this.control2.position.set(600, 400);

        this.control3 = new Text("Crawl: KeyS / click arrowDown", Tangerine);
        this.control3.position.set(150, 480);

        this.control4 = new Text("Left: KeyA / click arrowLeft", Tangerine);
        this.control4.position.set(150, 560);

        this.control5 = new Text("Right: KeyD / click arrowRight", Tangerine);
        this.control5.position.set(150, 400);

        this.control6 = new Text("Punch: KeyJ / click button A", Tangerine);
        this.control6.position.set(600, 480);

        this.control7 = new Text("Range Attack: KeyK / click button B", Tangerine);
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