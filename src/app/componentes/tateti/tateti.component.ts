import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Tateti } from '../../clases/juego-tateti';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit
{
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : Tateti;
  turnoActual:string;
  juegoTerminado:boolean;
  marcaJugador:string;

  tiempo:number;
  repetidor:any;

  elegirMarca:boolean;
  mensajes:string;

  constructor()
  {
    this.nuevoJuego = new Tateti();
    this.turnoActual = "jugador";
    this.juegoTerminado = false;
    this.marcaJugador = "circulo";
    this.tiempo = 2;
    this.elegirMarca = true;
  }

  ngOnInit()
  {}

  CambiarMarcador(marcador:string)
  {
    if(this.elegirMarca)
    {
      this.marcaJugador = marcador;
      this.elegirMarca = false;
    }
  }

  Reiniciar()
  {
    this.juegoTerminado = false;
    this.turnoActual = "jugador";
    this.MarcarVacio();
    this.elegirMarca = true;
  }

  MarcarVacio()
  {
    let fichas = this.nuevoJuego.fichas;
    for (let index = 0; index < fichas.length; index++)
    {
      fichas[index].CambiarFichaAVacia();
    }
  }

  Marcar(ficha:any)
  {
    if(this.turnoActual == "jugador" && this.juegoTerminado == false && ficha.estado == "vacio")
    {
      if(this.marcaJugador == "circulo")this.CambiarACirculo(ficha);
      else this.CambiarACruz(ficha);
      if(this.juegoTerminado == false)
      {
        this.turnoActual = "cpu";
        this.MarcaMaquina();
      }
    }
  }

  CambiarACirculo(ficha:any)
  {
    ficha.CambiarFichaACirculo();
    this.VerficarVictoria();
  }

  CambiarACruz(ficha:any)
  {
    ficha.CambiarFichaACruz();
    this.VerficarVictoria();
  }

  //muestra si alguno gano
  VerficarVictoria()
  {
    let fichas = this.nuevoJuego.fichas;
    let victoria = "";
    let estadoBuscado = "";
    for (let index = 0; index < 2; index++)
    {
      if(index == 0)estadoBuscado = "circulo";
      if(index == 1)estadoBuscado = "cruz";

      if(fichas[0].estado == estadoBuscado)
      {
        if(fichas[1].estado == estadoBuscado && fichas[2].estado == estadoBuscado)victoria = estadoBuscado;
        else if(fichas[3].estado == estadoBuscado && fichas[6].estado == estadoBuscado)victoria = estadoBuscado;
        else if(fichas[4].estado == estadoBuscado && fichas[8].estado == estadoBuscado)victoria = estadoBuscado;
      }
      else if(fichas[4].estado == estadoBuscado)
      {
        if(fichas[3].estado == estadoBuscado && fichas[5].estado == estadoBuscado) victoria = estadoBuscado;
        else if(fichas[1].estado == estadoBuscado && fichas[7].estado == estadoBuscado) victoria = estadoBuscado;
        else if(fichas[2].estado == estadoBuscado && fichas[6].estado == estadoBuscado)victoria = estadoBuscado; 
      }
      else if(fichas[8].estado == estadoBuscado)
      {
        if(fichas[6].estado == estadoBuscado && fichas[7].estado == estadoBuscado) victoria = estadoBuscado;
        else if(fichas[2].estado == estadoBuscado && fichas[5].estado == estadoBuscado)victoria = estadoBuscado;
      }      
    }

    if(victoria == this.marcaJugador)
    {
      this.MostarMensaje("Usted a ganado",true);
      this.nuevoJuego.gano = true;
      this.juegoTerminado = true;
    }
    else if (victoria != "")
    {
      this.MostarMensaje("Usted es un perdedor",false);
      this.nuevoJuego.gano = false;
      this.juegoTerminado = true;
    }
  }

  MarcaMaquina()
  {
    let fichas = this.nuevoJuego.fichas;
    let listaVacio = new Array();
    let numero = 0;
    for (let i = 0; i < fichas.length; i++)
    {
      if(fichas[i].estado == "vacio")
      {
        listaVacio.push(i);
      }
    }
    if(listaVacio.length > 0)
    {
      numero = Math.floor(Math.random()* listaVacio.length )+0;

      this.repetidor = setInterval(()=>
      {
      this.tiempo--;
      if(this.tiempo ==0 )
        {
          clearInterval(this.repetidor);
          this.MarcarOpuesto(fichas[listaVacio[numero]]);
          this.tiempo=2;
        }
      }, 1100);
    }
  }

  MarcarOpuesto(ficha:any)
  {
    if(this.juegoTerminado == false)
    {
      if(this.marcaJugador != "circulo")this.CambiarACirculo(ficha);
      else this.CambiarACruz(ficha);
      if(this.juegoTerminado == false)
      {
        this.turnoActual ="jugador";
      }
    }
  }

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.mensajes = mensaje;    
    var x = document.getElementById("snackbar");
    if(ganador)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }
    var modelo=this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
     }, 3000);
    console.info("objeto",x);
   }


}
