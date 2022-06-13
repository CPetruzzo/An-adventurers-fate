import { utils } from "pixi.js";

export class Keyboard{

    /* readonly dice que no se puede decir state lalala más allá de esta primera vez, 
    onda querer modificarlo dentro del private constructor, poner Keyboard.state NOOOO
    O tambien si el juego quiere reescribir por algun motivo Keyboard.state=undefined no lo deje tampoco */
    public static readonly state: Map<string, boolean>=new Map();

    public static readonly down: utils.EventEmitter = new utils.EventEmitter;
    public static readonly up: utils.EventEmitter = new utils.EventEmitter;

    private constructor(){} /* esto hace que no pueda hacer un new nunca */

    private static initialized: boolean=false;
    public static initialize():void{
        /*no se usa this porque son estaticas, tengo que usar el nombre de la clase para acceder*/
        if (Keyboard.initialized){
            return;
        } 
        Keyboard.initialized=true;
        document.addEventListener("keydown", Keyboard.onKeyDown)
        document.addEventListener("keyup", Keyboard.onKeyUp)
    }
/* privada para que no me puedan llamar desde afuera y static porque la llame desde keyboard no desde this, 
porque no hice un new porque lo hice private no tengo this*/
    private static onKeyDown(e:KeyboardEvent){
        if (Keyboard.state.get(e.code) != true){ /* esto es para que no me marque mil veces que apreté la letra*/
            Keyboard.down.emit(e.code);
        } Keyboard.state.set(e.code/*la string*/, true /* y el valor booleano*/);
    }

    private static onKeyUp(e:KeyboardEvent){
        Keyboard.up.emit(e.code)
        Keyboard.state.set(e.code, false);
    }
}