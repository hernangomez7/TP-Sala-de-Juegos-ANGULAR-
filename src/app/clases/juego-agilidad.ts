import { Juego } from '../clases/juego'

export class JuegoAgilidad extends  Juego {
    numeroUno:number = 0;
    numeroDos:number = 0;
    operacion:number = 0;
    operador:string = "";
    numeroIngresado:number = 0;
    inicio:any;
    resultado:number = 0;
    constructor(nombre?: string, gano?: boolean, jugador?:string)
    {
      super("Agilidad aritmetica",gano,jugador);
      this.inicio = false;
    }
    
    public verificar() {
        if (this.numeroIngresado == this.resultado)
        {
          this.gano = true;
        }
        if (this.gano)
        {
          return true;
        }else
        {
          return false;
        }
     }

     public comenzar()
     {
        this.numeroUno = Math.floor(Math.random()*100)+1;
        this.numeroDos = Math.floor(Math.random()*100)+1;
        let numeroX = 0;
        this.operacion = Math.floor(Math.random()*4)+1;
        switch(this.operacion)
        {
          case 1:
          this.resultado=this.numeroUno+this.numeroDos;
          break;
          case 2:
          this.resultado=this.numeroUno-this.numeroDos;
          break;
          case 3:
          if(this.numeroUno > this.numeroDos) this.resultado = this.numeroUno / this.numeroDos;
          else
          {
            numeroX = this.numeroUno;
            this.numeroUno = this.numeroDos;
            this.numeroDos = numeroX;
            this.resultado = this.numeroUno /this.numeroDos;
          }
          break;
          case 4:
          this.resultado=this.numeroUno*this.numeroDos;
          break;
        }

        this.resultado = parseFloat(this.resultado.toFixed(2));
        switch (this.operacion)
        {
          case 1:
          this.operador="+";
          break;
          case 2:
          this.operador="-";
          break;
          case 3:
          this.operador="/";
          break;
          case 4:
          this.operador="*";
          break;
        }    
        this.inicio = true;
     }
}
