import { Juego } from '../clases/juego'

export class JuegoAnagrama extends  Juego
{
    // numero:number;
    palabraElegida:string;
    respuestaElegida:string;
    palabraDesordenada:string;

    constructor(nombre?: string, gano?: boolean, jugador?:string)
    {
      super("Anagrama",gano,jugador);
      this.palabraElegida = "";
      this.respuestaElegida = "";
      this.palabraDesordenada = "";
    }

    desordenarPalabra(listaPalabras)
    {
      let numero = Math.floor(Math.random()*39)+0;
      let valores = new Array;
      let valores2 = new Array;
      // let numero = 0;

      this.palabraElegida = listaPalabras[numero];
      this.palabraDesordenada = "";

      for (let i = 0; i < this.palabraElegida.length; i++)
      {
        valores.push(this.palabraElegida[i]);
      }

      while (valores.length != 0)
      {
        numero = Math.floor(Math.random()* valores.length )+0;
        
        valores2.push(valores[numero]);
        valores.splice(numero,1);
      }
      this.palabraDesordenada = valores2.join("");
    }

    public verificar()
    {
      // console.log(this.respuestaElegida);
      if(this.respuestaElegida == this.palabraElegida)
      {
        this.gano = true;
        return true;
      }else{
        this.gano = false;
        return false;
      }
    }

  public mostrarResultado()
  {
    console.log(this.palabraElegida);
  }


}
