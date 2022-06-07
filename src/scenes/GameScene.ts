import { Container, Texture, TilingSprite } from "pixi.js";
import { HEIGHT, WIDTH } from "..";

// import { checkCollision } from "../games/IHitBox";

import { Player } from "../games/Player";

import { IUpdateable } from "../utils/IUpdateable";
import { Scene } from "./Scene";

export class GameScene extends Container implements IUpdateable {

    private playerBardo: Player;
    private world: Container;
    public numero:number =0;
    private backgrounds: TilingSprite[];
    gameOver: boolean = false;
    private UIButtons: Scene

    constructor() {
        super();
        this.backgrounds=[];

        this.world = new Container();

        this.UIButtons= new Scene();
        // FONDOS
        for (let i=1; i<6; i++){
            const background = new TilingSprite(
                Texture.from("B"+i),
                1280,
                720
            );
            this.addChild(background);
            this.backgrounds.push(background);
        }

        // UN JUGADOR
        this.playerBardo = new Player();
        this.playerBardo.scale.set(2);
        this.playerBardo.position.y=650;
        this.world.addChild(this.playerBardo);

        this.addChild(this.world);
        this.addChild(this.UIButtons)
    }
    
    // ACTUALIZACION PARA DARLE SU FISICA Y SU MOVIMIENTO
    public update(deltaTime: number, _deltaFrame: number): void {
        // if (this.gameOver) return;
        this.playerBardo.update(deltaTime); //updateAnimation
        

        // PARALLAX
        for (let i = 0; i < this.backgrounds.length; i++) {
			const background = this.backgrounds[i];
			const factor = (i / 6);
            if (this.playerBardo.x<0){
                background.tilePosition.x = background.tilePosition.x;
            }
            else 
            {
            background.tilePosition.x -= factor * this.playerBardo.speed.x/50;
            }
    }


    // LIMITES DE LA PANTALLA
        {
    // LIMITES HORIZONTALES //
        // LIMITE DERECHO
            // if (this.playerBardo.x > ((2 * WIDTH) - 100)) {
            //     this.playerBardo.x = (2 * WIDTH) - 100;
                
            //     this.playerBardo.scale.set(-0.5,0.5);


            // }
        // LIMITE IZQUIERDO 
            if (this.playerBardo.x < 0) {
                this.playerBardo.x = 0;
                this.world.x=0;
                this.playerBardo.scale.set(-2,2);
            }

    // LIMITES VERTICALES //
        // LIMITE INFERIOR
            if (this.playerBardo.y > (HEIGHT )) {
                this.playerBardo.y = (HEIGHT );
                this.playerBardo.canJump = true;
                this.gameOver = true;
            }
        }

        // CAMARA SEGUÍ A MI PERSONAJE
        {
            (this.world.x = - this.playerBardo.x * this.worldTransform.a + WIDTH / 3)
        }

    }
}
