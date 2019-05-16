import { Juego } from './juego'
import { Ficha_tateti } from './ficha_tateti'


export class Tateti extends  Juego
{
    fichas:Array<Ficha_tateti>;
    numeroSecreto: number = 0;
    numeroIngresado = 0;
    constructor(nombre?: string, gano?: boolean, jugador?:string)
    {
      super("Tateti",gano,jugador);

      this.fichas = new Array();
      let ficha:Ficha_tateti;
      this.fichas.push(ficha = new Ficha_tateti() );
      this.fichas.push(ficha = new Ficha_tateti() );
      this.fichas.push(ficha = new Ficha_tateti() );
      this.fichas.push(ficha = new Ficha_tateti() );
      this.fichas.push(ficha = new Ficha_tateti() );
      this.fichas.push(ficha = new Ficha_tateti() );
      this.fichas.push(ficha = new Ficha_tateti() );
      this.fichas.push(ficha = new Ficha_tateti() );
      this.fichas.push(ficha = new Ficha_tateti() );

    }
    public verificar()
    {
        if (this.numeroIngresado == this.numeroSecreto) {
          this.gano = true;
        }
        if (this.gano) {
          return true;
        } else {
          return false;
        }
     }
}
