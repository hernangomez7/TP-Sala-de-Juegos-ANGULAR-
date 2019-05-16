import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() 
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  respuesta:any;
  temporizador:any;
  mensajes:string;
  verificarB:boolean;
  private subscription: Subscription;
  ngOnInit() {
  }
  constructor()
  {
    this.ocultarVerificar = true;
    this.verificarB = false;
    this.Tiempo = 5; 
    this.nuevoJuego = new JuegoAgilidad();
  }
  NuevoJuego()
  {
    this.nuevoJuego.comenzar();
    this.ocultarVerificar = false;
    this.repetidor = setInterval(()=>
    {
      this.Tiempo--;
      if(this.Tiempo == 0 ||  this.verificarB == true)
      {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar = true;
        this.Tiempo = 5;
        this.verificarB = false;
      }
    }, 1000);
  }

  cambiarVerificar()
  {
    this.verificarB = true;
  }

  verificar()
  {
    this.nuevoJuego.inicio = false;
    this.respuesta = this.nuevoJuego.numeroIngresado;
    if (this.respuesta == this.nuevoJuego.resultado)
    {
      this.MostarMensaje("Correcto",true);
      this.nuevoJuego.gano = true;
    }else
    {
      this.MostarMensaje("Has fallado era:"+this.nuevoJuego.resultado,false);
      this.nuevoJuego.gano = false;
    }
    
  }

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false)
  {
    this.mensajes = mensaje;    
    var x = document.getElementById("snackbar");
    if(ganador)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }
    var modelo=this;
    setTimeout(function()
    { 
      x.className = x.className.replace("show", "");
    }, 3000);
   }
}
