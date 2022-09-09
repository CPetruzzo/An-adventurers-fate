// import { sound } from "@pixi/sound";
import { Graphics, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { Tween } from "tweedle.js";
// import { Tween } from "tweedle.js";
// import Typed from "typed.js";
import { PointButton } from "../ui/PointButton";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameStartScene } from "./GameStartScene";


export class TextScene extends SceneBase {

    // private buttonText: PointButton;
    private buttonMouse: PointButton;

    public mostrarEscrito: boolean = false;
    public settings: Sprite;
    public title: Text;
    public panelTexto: Graphics;
    public buttonText: PointButton;
    public fondo: Graphics;

    // public textoViejo: BitmapText;

    constructor() {
        super();

        const TangerineTitle = new TextStyle({ fontFamily: "Tangerine", fontSize: 130, fill: 0X1819 });


        this.settings = Sprite.from("An adventurer's fate.png");



        this.buttonMouse = new PointButton(Texture.from("BACK.png"),
            Texture.from("BACK hundido.png"),
            Texture.from("BACK.png"));
        this.buttonMouse.x = 650
        this.buttonMouse.y = 670
        this.buttonMouse.scale.x = 0.5;
        this.buttonMouse.scale.y = 0.5;
        this.buttonMouse.on("pointerClick", this.onButtonClick, this);

        this.buttonText = new PointButton(Texture.from("BACK.png"),
            Texture.from("BACK hundido.png"),
            Texture.from("BACK.png"));
        this.buttonText.x = 650
        this.buttonText.y = 370
        this.buttonText.scale.x = 0.5;
        this.buttonText.scale.y = 0.5;
        this.buttonText.on("pointerClick", this.onButtonText, this);

        
        this.title = new Text("This is Arek the great's story", TangerineTitle);
        this.title.position.x=SceneManager.WIDTH/2- (this.title.width/2)
        ;
        this.title.position.y=150;

        this.panelTexto=new Graphics();
        this.panelTexto.beginFill(0x00FF00, 1);
        this.panelTexto.drawRect(this.title.position.x+this.title.width,this.title.position.y,-this.title.width,this.title.height);
        this.panelTexto.endFill();

        
        this.fondo = new Graphics();
        this.fondo.beginFill(0x00FF00,1);
        this.fondo.drawRect(0,0,SceneManager.WIDTH,SceneManager.HEIGHT);
        this.fondo.endFill();



        this.addChild(
            this.settings, 
            this.fondo,
            this.title, 
            this.buttonMouse,
            this.panelTexto,
            this.buttonText
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
    onButtonText() {
        new Tween(this.panelTexto)
            .to({ x: 1280}, 5000)
            .start()
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