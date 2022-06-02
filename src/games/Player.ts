import { Graphics, IDestroyOptions, ObservablePoint, Rectangle } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { IHitBox } from "./IHitBox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Player extends PhysicsContainer implements IHitBox {
       
    private static readonly GRAVITY = 1000;
    private static readonly MOVE_SPEED = 350;
    public canJump= true;
    private hitbox: Graphics;


    constructor()
    {
        super();

        
            // PUNTO GUÍA
            const auxZero=new Graphics();
            auxZero.beginFill(0xFF00FF);
            auxZero.drawCircle(0,-40,10);
            auxZero.endFill();
            // this.addChild(auxZero);

            // CAJAS
            this.hitbox=new Graphics();
            this.hitbox.beginFill(0xFF00FF, 0);
            this.hitbox.drawRect(-100,-280,200,280);
            this.hitbox.endFill();


            this.acceleration.y= Player.GRAVITY;
            Keyboard.down.on("KeyW",this.jump,this)


            // this.addChild(auxZero);
            this.addChild(this.hitbox)

            // agrego todos los movimientos a la clase player
            this.addChild()
            
    }

    // ESTO ES PARA QUE CUANDO DESTRUYA EL PLAYER TAMBIÉN SE BORRE EL MÉTODO DE SALTAR KEYBOARD DOWN ARROW UP ----> THIS.JUMP
    public override destroy(options: boolean | IDestroyOptions | undefined){
        super.destroy(options);
        Keyboard.down.off("KeyW",this.jump);
    }

    //  MOVIMIENTOS
    public override update(deltaMS:number)
    {
        super.update(deltaMS/1000);
        // lo que es lo mismo que deltaseconds/(1/60)
        // this..update(deltaMS/(1000/60)); // esto es para saber cuantos frames pasaron (que deberían ser 1)
        
        //  CAMINAR HACIA LA IZQUIERDA
        if (Keyboard.state.get("KeyA")){
            this.speed.x=-Player.MOVE_SPEED;
            this.scale.set(0.5);
            

        } else if 
        //  CAMINAR HACIA LA DERECHA
        (Keyboard.state.get("KeyD")){
            this.speed.x=Player.MOVE_SPEED;
            this.scale.set(-0.5,0.5);
            
        } else if 
            //arrastrarse
            ((Keyboard.state.get("KeyS")) && (Keyboard.state.get("KeyD"))){
                this.speed.x=Player.MOVE_SPEED;
                this.scale.set(-0.5,0.5);
               
            
      } else /*  FRENAR  */ {
            this.speed.x=0;
            
        }
        // SALTAR
        if (Keyboard.state.get("KeyW")){
            this.jump;
         
        }
        // ATACAR
        if (Keyboard.state.get("KeyJ")){
            
        }
        //DEFENDER
        if (Keyboard.state.get("KeyK")){
           
        }
    }

    //  FUNCION AUXILIAR (SI NO LA TENGO SEPARADA NO PUEDO BORRARLA CUANDO ELIMINE A PLAYER)
    private jump(){
        if (this.canJump){
            this.speed.y=-(Player.GRAVITY*0.7)
            this.canJump=false;
        }
    }

    // me da la distancia desde el (0,0) al borde inicial de la hitbox
    public getHitBox(): Rectangle
    {
        return this.hitbox.getBounds(); 
    }

    //PARA SEPARAR JUGADORES DE SUS PLATAFORMAS
    public separate(overlap: Rectangle, platform: ObservablePoint<any>) {
         if (overlap.width < overlap.height) {
            if (this.x < platform.x) {
                this.x -= overlap.width;
            } else if (this.x > platform.x) {
                this.x += overlap.width;
            }
        }
        else 
        {
            // POR ACA ESTA MI PROBLEMA, SIEMPRE ME APARECE QUE GOLPEO DESDE ABAJO
            if (this.y > platform.y) 
            {
                this.y += overlap.height;
                this.speed.y = 0;
            } else if (this.y < platform.y) {
                this.y -= overlap.height;
                this.speed.y = 0;
                this.canJump = true;
            }
        }
    }

}
