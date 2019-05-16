import { Juego } from './juego'

export class Blackjack7 extends  Juego
{
    numero:number = 0;
    constructor(nombre?: string, gano?: boolean, jugador?:string)
    {
      super("Black jack 7",gano,jugador);
      
    }
    
    public verificar()
    {
      return true;
    }

     
}
