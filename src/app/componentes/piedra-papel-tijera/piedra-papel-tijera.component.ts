import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  @Output()
    enviarJuego :EventEmitter<any>= new EventEmitter<any>();
    nuevoJuego : JuegoPiedraPapelTijera;
    mensajes:string;
    ocultarElegir:boolean;
    private subscription: Subscription;
    traduccion: string;

    ngOnInit() {
    }

  constructor() {
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    console.info("Inicio PPT");
    this.ocultarElegir = false;
    if(this.nuevoJuego.inicio == false)
    {
      this.ocultarElegir = false;
    }
  }

  Nuevo(){
    this.nuevoJuego.rondas = 0;
    this.nuevoJuego.victorias = 0;
    this.nuevoJuego.derrotas = 0;
  }


  Elegir(numero:number){
    this.nuevoJuego.rondas ++;

    this.nuevoJuego.eleccion_cpu = Math.floor(Math.random()*3)+1;

    switch(this.nuevoJuego.eleccion_cpu)
    {
      case 1:
        this.traduccion = "piedra";
      break;
      case 2:
        this.traduccion = "papel";
      break;
      default:
        this.traduccion = "tijera";
      break;
    }

    this.nuevoJuego.eleccion_jugador = numero;

    if( this.nuevoJuego.eleccion_jugador != this.nuevoJuego.eleccion_cpu)
    {
      if(this.nuevoJuego.verificar())
      {
        this.nuevoJuego.victorias ++;
        this.MostarMensaje("Victoria el a elegido ("+this.traduccion+")",true);
      }
      else{
        this.nuevoJuego.derrotas ++;
        this.MostarMensaje("Boooo!!! el a elegido ("+this.traduccion+")",false);
      }
    }else
    {
      this.MostarMensaje("Empate ambos eligieron ("+this.traduccion+")",false);
    }

    console.log("eleccion CPU:"+this.nuevoJuego.eleccion_cpu);
    console.log("eleccion Jugador:"+this.nuevoJuego.eleccion_jugador);
    this.ocultarElegir = true;


  }


  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.mensajes=mensaje;    
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
       modelo.ocultarElegir=false;
     }, 2500);
    console.info("objeto",x);
  
   }


 

}
