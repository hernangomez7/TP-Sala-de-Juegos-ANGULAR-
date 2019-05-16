import { Juego } from '../clases/juego'

export class JuegoPiedraPapelTijera  extends  Juego {
    rondas:number = 0;
    victorias:number = 0;
    derrotas:number = 0;
    eleccion_jugador:number = 0;
    eleccion_cpu:number = 0;
    elegir:boolean = false;
    inicio:boolean = false;

    constructor(nombre?: string, gano?: boolean, jugador?:string){
        super("Piedra papel o tijeras",gano,jugador);


    }

    public verificar() {
        switch(this.eleccion_jugador)
        {
            case 1:
                if(this.eleccion_cpu == 3)
                {
                    this.gano = true;
                }else{
                    this.gano = false;
                }
            break;
            case 2:
                if(this.eleccion_cpu == 1)
                {
                    this.gano = true;
                }else{
                    this.gano = false;
                }
            break;
            case 3:
                if(this.eleccion_cpu == 2)
                {
                    this.gano = true;
                }else{
                    this.gano = false;
                }
            break;
        }
        if (this.gano) {
          return true;
        } else {
          return false;
        }
    }

    
}
