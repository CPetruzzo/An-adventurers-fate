import { Container, Texture, TilingSprite } from "pixi.js";
import { HEIGHT, WIDTH } from "..";

// import { checkCollision } from "../games/IHitBox";

import { Player } from "../games/Player";

import { IUpdateable } from "../utils/IUpdateable";

export class TickerScene extends Container implements IUpdateable {

    private playerJuan: Player;
    private world: Container;
    public numero:number =0;
    private backgrounds: TilingSprite[];
    gameOver: boolean = false;

    constructor() {
        super();
        this.backgrounds=[];

        this.world = new Container();

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
        this.playerJuan = new Player();
        this.playerJuan.scale.set(0.5);
        this.playerJuan.position.y=650;
        this.world.addChild(this.playerJuan);

        this.addChild(this.world);
    }
    
    // ACTUALIZACION PARA DARLE SU FISICA Y SU MOVIMIENTO
    public update(deltaTime: number, _deltaFrame: number): void {
        // if (this.gameOver) return;
        this.playerJuan.update(deltaTime); //updateAnimation

        // PARALLAX
        for (let i = 0; i < this.backgrounds.length; i++) {
			const background = this.backgrounds[i];
			const factor = (i / 6);
            if (this.playerJuan.x<0 || ((this.playerJuan.x>(2 * WIDTH) - 100))){
                background.tilePosition.x = background.tilePosition.x;
            }
            else 
            {
            background.tilePosition.x -= factor * this.playerJuan.speed.x/200;
            }
    }


    // LIMITES DE LA PANTALLA
        {
    // LIMITES HORIZONTALES //
        // LIMITE DERECHO
            if (this.playerJuan.x > ((2 * WIDTH) - 100)) {
                this.playerJuan.x = (2 * WIDTH) - 100;
                
                this.playerJuan.scale.set(-0.5,0.5);


            }
        // LIMITE IZQUIERDO 
            if (this.playerJuan.x < 0) {
                this.playerJuan.x = 0;
                this.world.x=0;
                this.playerJuan.scale.set(0.5);
            }

    // LIMITES VERTICALES //
        // LIMITE INFERIOR
            if (this.playerJuan.y > (HEIGHT )) {
                this.playerJuan.y = (HEIGHT );
                this.playerJuan.canJump = true;
                this.gameOver = true;
            }
        }

        // CAMARA SEGUÍ A MI PERSONAJE
        {
            (this.world.x = - this.playerJuan.x * this.worldTransform.a + WIDTH / 3)
        }

    }
}
