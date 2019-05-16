import { Component, OnInit } from '@angular/core';
import { Blackjack7 } from '../../clases/juego-blackjack7';
import { Carta } from '../../clases/carta';

@Component({
  selector: 'app-blackjack7',
  templateUrl: './blackjack7.component.html',
  styleUrls: ['./blackjack7.component.css']
})
export class Blackjack7Component implements OnInit
{
  nuevoJuego: Blackjack7;
  baraja:any;
  mensajes:string;
  mensajeActivo:boolean;

  manoJugador:any;
  cantidadJugador:number;
  cartaFantasma:Carta = new Carta();
  juegoTerminado:boolean;

  manoJugadorDividida:any;
  cantidadJugadorDividida:number;
  dosManos:boolean;
  manoJugadorQuedo:boolean;
  turnoJugador:boolean = false;

  manoCroupier:any;
  cantidadCroupier:number;

  asegurado:boolean = false;

  jugadorDinero:number;
  apuestaActual:number;
  ocultarApostar:boolean;
  doblePaga:boolean;
  ocultarReiniciar:boolean;
  ocultarComoJugar:boolean;
  comoJugarValor:number;
  informacion:string = "";

  constructor()
  {
    this.ocultarComoJugar = true;
    this.comoJugarValor = 0;
    this.nuevoJuego = new Blackjack7();
    this.baraja = new Array();
    this.mensajeActivo = false;
    this.iniciarJuego();
    this.jugadorDinero = 0;
    this.apuestaActual = 0;
    this.ocultarApostar = true;
    this.ocultarReiniciar = true;
    this.Reiniciar();
  }

  iniciarJuego()
  {
    this.manoCroupier = new Array(this.cartaFantasma,this.cartaFantasma,this.cartaFantasma,this.cartaFantasma,this.cartaFantasma);
    this.cantidadCroupier = 0;
    this.manoJugador = new Array(this.cartaFantasma,this.cartaFantasma,this.cartaFantasma,this.cartaFantasma,this.cartaFantasma);
    this.cantidadJugador = 0;
    this.manoJugadorDividida = new Array(this.cartaFantasma,this.cartaFantasma,this.cartaFantasma,this.cartaFantasma,this.cartaFantasma);
    this.cantidadJugadorDividida = 0;
    this.dosManos = false;
    this.manoJugadorQuedo = false;
    this.juegoTerminado = false;
    this.ReiniciarBaraja();
    this.CartasCroupier();
    this.asegurado = false;
    this.turnoJugador = true;
    this.juegoTerminado = true;
    this.doblePaga = false;
  }

  Reiniciar()
  {
    if(!this.ocultarReiniciar)this.ToggleFormReiniar();
    var modelo = this;
    setTimeout(function()
    {
      modelo.jugadorDinero = 1000;
      modelo.apuestaActual = 0;
      modelo.iniciarJuego();
      modelo.MostarMensaje("Comience con una apuesta",true);
    }, 1500);
    
  }

  ApostarIniciar()
  {
    if(this.apuestaActual <= this.jugadorDinero && this.apuestaActual > 9)
    {
      this.iniciarJuego();
      this.juegoTerminado = false;
      this.RecibirCarta();
      this.RecibirCarta();
      this.ocultarApostar = true;
    }
    else if(this.jugadorDinero < 10) this.MostarMensaje("Perdio todo su dinero",false);
  }

  ComoJugar(valor:number)
  {
   if(valor == 0) this.informacion = "El objetivo del blackjack7 es obtener la mayor cantidad de dinero posible. El juego se desarrolla por rondas, donde debe tomar cartas y sumar hasta llegar a un valor de 21 o lo mas serca, pero no debe superar este valor una vez que haya elegido quedarse, el croupier comenzara a jugar, si el croupier obtiene un valor mas sercano a 21 que usted el habra ganado,si se pasa o usted esta mas serca de 21 usted ganara la ronda";
   else if(valor == 1) this.informacion = "Para comenzar debera apostar un valor superior a 10, recibira 2 cartas y se sumaran, sí quiere quedarse con esas cartas elija [Quedarse], sí quiere una carta elija [Nueva carta] o puede utilizar las otras funciones una vez haya ganado o perdido, puede modificar el valor de apuesta, no es necesario cambiar la apuesta para seguir, solo presion[Nueva carta]";
   else if(valor == 2) this.informacion = "Se obtendra Blackjack cuando se obtiene una suma total de 21 al comenzar la ronda, ganando 3/2 de la apuesta.";
   else if(valor == 3) this.informacion = "Si comienza con un valor de 9, 10 o 11, usted puede doblar su apuesta, sin embargo se le asignara una nueva carta y no podra elegir mas cartas, ganara el doble o perdera el doble."
   else if(valor == 4) this.informacion = "Cuando comience con 2 cartas del mismo valor podra dividir sus carta en dos jugadas, si elije [Nueva carta] se le asignara una carta nueva a la primera mano, si elije [Quedarse], pasara a jugar con la otra mano, tenga en cuenta que debe apostar el doble, ganá dinero por cada mano que supere al croupier, si se pasa solo perdera esa mano.";
   else if(valor == 5) this.informacion = "Sí el croupier tiene un As, puede hacer una apuesta lateral de que el croupier obtendra blackjack, apostara un valor igual a la mitad de la apuesta inicial como apuesta asegurada, si el croupier obtiene blackjack usted perdera la mitad de la apuesta inicial, si no obtiene blackjack usted perdera la apuesta asegurada y el juego seguira de forma normal.";

  }

  ToggleFormComoJugar()
  {
    if(this.ocultarComoJugar != false)
    {
      this.ComoJugar(0);
      this.ocultarComoJugar = false;
    }
    else this.ocultarComoJugar = true;
  }

  ToggleFormApostar()
  {
    if(this.juegoTerminado == true)
    {
      if(this.ocultarApostar != false) this.ocultarApostar = false;
      else this.ocultarApostar = true;
    }else{
      this.MostarMensaje("Solo se apuesta al terminar una ronda",false);
    }
  }

  ToggleFormReiniar()
  {
    if(this.ocultarReiniciar != false) this.ocultarReiniciar = false;
    else this.ocultarReiniciar = true;
  }

  RepartirDinero(jugado:string)
  {
    this.juegoTerminado = true;
    if(jugado == "gano")
    {
      this.jugadorDinero += this.apuestaActual;
      if(this.doblePaga == true)this.jugadorDinero += this.apuestaActual;
    }
    else if(jugado == "perdio")
    {
      this.jugadorDinero -= this.apuestaActual;
      if(this.doblePaga == true)this.jugadorDinero -= this.apuestaActual;
    }
    else if(jugado == "ganoBlackjack")
    {
      this.jugadorDinero += (this.apuestaActual * 1.5);
    }
    else if(jugado == "perdioBlackjack")
    {
      if(this.asegurado == false)
      {
        this.jugadorDinero -= this.apuestaActual;
      }     
    }    
  }

  CartasCroupier()
  {
      this.RecibirCartaJugador(this.manoCroupier);
      this.manoCroupier[1] = new Carta("assets/img/fondo.png","fantasma","0");
    
  }

  JuegaCroupier()
  {
    let gano = 0;
    let perdio = 0;
    if(this.juegoTerminado == false)
    {
      while(this.cantidadCroupier < 17 && this.manoCroupier[4].numero == "0")
      {
        this.RecibirCartaJugador(this.manoCroupier);
      }
    }

    if(this.cantidadCroupier < 21 && this.juegoTerminado == false)
    {
      this.juegoTerminado = true;
      if(this.dosManos == false)
      {
        if(this.cantidadCroupier > this.cantidadJugador)
        {
          this.RepartirDinero("perdio");
          this.MostarMensaje("perdio",false);
        }else if(this.cantidadCroupier == this.cantidadJugador)
        {
          this.MostarMensaje("empate",true);
        }else{
          if(this.cantidadJugador <= 21)
          {
            this.RepartirDinero("gano");
            this.MostarMensaje("gano",true);
          }
        }
      }else{
        if(this.cantidadCroupier > this.cantidadJugador)
        {
          perdio++;
        }else if(this.cantidadCroupier < this.cantidadJugador)
        {
          if(this.cantidadJugador <= 21)
          {
            gano++;
          }
        }
        if(this.cantidadCroupier > this.cantidadJugadorDividida)
        {
          perdio++;
        }
        else if(this.cantidadCroupier < this.cantidadJugadorDividida)
        {
          if(this.cantidadJugadorDividida <= 21)
          {
            gano++;
          }
        }
        if(this.cantidadJugador > 21) perdio++;
        if(this.cantidadJugadorDividida > 21) perdio++;
        if(gano == 1 && perdio == 1)this.MostarMensaje("gano y perdio",true);
        else if(gano == 0 && perdio == 0)this.MostarMensaje("empate",true);
        else if(gano == 1 && perdio == 0)
        {
          this.RepartirDinero("gano");
          this.MostarMensaje("gano",true);
        }
        else if(gano == 0 && perdio == 1)
        {
          this.RepartirDinero("perdio");
          this.MostarMensaje("perdio",false);
        }
        else if(gano == 2 && perdio == 0)
        {
          this.RepartirDinero("gano");
          this.RepartirDinero("gano");
          this.MostarMensaje("gano",true);
        }
        else if(gano == 0 && perdio == 2)
        {
          this.RepartirDinero("perdio");
          this.RepartirDinero("perdio");
          this.MostarMensaje("perdio",false);
        }

      }
    }
  }


  ContarCartasCroupier()
  {
    this.cantidadCroupier = this.ContarCartas(this.manoCroupier);

    if(this.manoCroupier[0].numero == "a")
    {
      if(this.manoCroupier[1].numero == "j" || this.manoCroupier[1].numero == "q" ||this.manoCroupier[1].numero == "k" ||this.manoCroupier[1].numero == "10")
      {
        this.RepartirDinero("perdioBlackjack");
        this.MostarMensaje("Blackjack",false);
      }
      else if(this.asegurado == true && this.manoCroupier[1].numero != "0")
      {
        this.asegurado = false;
        this.jugadorDinero -= (this.apuestaActual/2);
      }
    }
    else if( this.cantidadCroupier == 21)
    {
      this.juegoTerminado = true;
      this.RepartirDinero("perdio");
      this.MostarMensaje("perdio",false);
    }
    else if(this.cantidadCroupier > 21)
    {
        this.juegoTerminado = true;
        if(this.dosManos == true)
        {
          if(this.cantidadJugador <= 21)this.RepartirDinero("gano");
          if(this.cantidadJugadorDividida <= 21)this.RepartirDinero("gano");
        }else{
          this.RepartirDinero("gano");
        }
        this.MostarMensaje("gano",true);
    }
  }

  Asegurarse()
  {
    if(this.manoCroupier[0].numero == "a" && this.dosManos == false && this.manoJugador[2].numero == "0" && this.juegoTerminado == false && this.asegurado == false)
    {
      if(this.jugadorDinero >= (this.apuestaActual *1.5))
      {
        this.asegurado = true;
        this.MostarMensaje("asegurado",true);
      }else{
        this.MostarMensaje("Te falta dinero",false);
      }
    }else{
      this.MostarMensaje("La carta del croupier debe ser un As",false);
    }
    
  }

  DividirBaraja()
  {
    let carta1 = 0;
    let carta2 = 0;
    if(this.juegoTerminado == false)
    {
      if(this.jugadorDinero >= (this.apuestaActual *2) )
      {
        if(this.manoJugador[0].numero != "0" && this.manoJugador[2].numero == "0")
        {
          if(this.manoJugador[0].numero == "a") carta1 = 11;
          else if(this.manoJugador[0].numero == "j" || this.manoJugador[0].numero == "q" || this.manoJugador[0].numero == "k") carta1 = 10;
          else carta1 = parseInt(this.manoJugador[0].numero);
          if(this.manoJugador[1].numero == "a") carta2 = 11;
          else if(this.manoJugador[1].numero == "j" || this.manoJugador[1].numero == "q" || this.manoJugador[1].numero == "k") carta2 = 10;
          else carta2 = parseInt(this.manoJugador[1].numero);
          if(carta1 == carta2)
          {
            this.manoJugadorDividida[0] = this.manoJugador[1];
            this.manoJugador[1] = this.cartaFantasma;
            this.dosManos = true;
            this.ContarCartasJugador();
          }else{
            this.MostarMensaje("Las cartas valen diferente",false);
          }
        }
      }else{
        this.MostarMensaje("Te falta dinero",false);
      }
    }
    
  }

  Doblar()
  {
    if(this.juegoTerminado == false)
    {
      if(this.manoJugador[2].numero == "0" && this.cantidadJugador > 8 && this.cantidadJugador < 12 && this.dosManos == false)
      {
        if(this.jugadorDinero >= (this.apuestaActual *2) )
        {
          this.doblePaga = true;
          this.RecibirCarta();
          this.turnoJugador = false;
          this.JuegaCroupier();
        }else{
          this.MostarMensaje("Necesitas mas dinero",false);
        }
      }else{
        this.MostarMensaje("Debes tener una suma menor igual a 9, 10 o 11",false);
      }
    }
  }

  ContarCartasJugador()
  {
    this.cantidadJugador = this.ContarCartas(this.manoJugador);
    if(this.dosManos == true)
    {
      this.cantidadJugadorDividida = this.ContarCartas(this.manoJugadorDividida);
    }

    if( this.cantidadJugador == 21 && this.dosManos == false && this.manoJugador[2].numbero == "0")
    {
      this.juegoTerminado = true;
      this.RepartirDinero("ganoBlackjack");
      this.MostarMensaje("Blackjack!",true);
    }
    else if(this.cantidadJugador > 21)
    {
      if(this.dosManos == false)
      {
        this.juegoTerminado = true;
        this.RepartirDinero("perdio");
        this.MostarMensaje("perdio",false);
      }else if(this.cantidadJugadorDividida > 21)
      {
        this.juegoTerminado = true;
        this.RepartirDinero("perdio");
        this.MostarMensaje("perdio",false);
      }
      
    }
  }

  Quedarse()
  {
    if(this.juegoTerminado == false)
    {
      if(this.manoJugadorQuedo == true)
      {
        this.turnoJugador = false;
        this.JuegaCroupier();
      }

      if(this.dosManos == true)
      {
        this.manoJugadorQuedo = true;
      }else if (this.juegoTerminado == false)
      {
        this.turnoJugador = false;
        this.JuegaCroupier();
      }
    }else{
      this.MostarMensaje("Ronda terminada elija una nueva carta o cambien la apuesta",false);
    }
  }

  RecibirCarta()
  {
    if(this.juegoTerminado == true)this.ApostarIniciar();
    else if(this.manoJugadorQuedo == false && this.turnoJugador == true)
    {
      if(this.cantidadJugador < 21)this.RecibirCartaJugador(this.manoJugador);
    }else if (this.manoJugadorQuedo == true)
    {
      if(this.cantidadJugadorDividida < 21)this.RecibirCartaJugador(this.manoJugadorDividida);
    }
  }

  RecibirCartaJugador(manoJugador:any)
  {
    if(this.juegoTerminado == false)
    {
      let valor = Math.floor(Math.random()* this.baraja.length )+0;
      for (let i = 0; i < manoJugador.length; i++)
      {
        if(manoJugador[i].numero == "0")
        {
          manoJugador[i] = this.baraja[valor];
          break;
        }
      }
      this.baraja.splice(valor,1);
      this.ContarCartasJugador();
      this.ContarCartasCroupier();
    }
  }

  ContarCartas(baraja:any):number
  {
    let resultado:number = 0;
    let valorCarta:string;
    let cantidadAses = 0;

    for (let i = 0; i < baraja.length; i++)
    {
      valorCarta = (baraja[i].numero);
     
      if(valorCarta == "a")
      {
        valorCarta = "11";
        cantidadAses ++;
      }
      else if(valorCarta == "j" || valorCarta == "q" || valorCarta == "k") valorCarta = "10";
      resultado += parseInt(valorCarta);
    }

    while(cantidadAses > 0 && resultado > 21)
    {
      resultado -= 10;
      cantidadAses --;
    }
    return resultado;
  }


  ReiniciarBaraja()
  {
    let cartaNueva:Carta;
    let valor:any;
    let palo:string;
    this.baraja = new Array();
    for (let index = 0; index < 52; index++)
    {
      if(index <= 12)
      {
        valor = index+1;
        if(valor == 1)valor = "a";
        else if(valor == 11)valor = "j";
        else if(valor == 12)valor = "q";
        else if(valor == 13)valor = "k";
        else valor = valor+"";
        palo = "pica";
        cartaNueva = new Carta("assets/img/"+palo+"/"+valor+".png",palo,valor);
        this.baraja.push(cartaNueva);
      }
      else if(index <= 25)
      {
        valor = index+1;
        valor -= 13;
        if(valor == 1)valor = "a";
        else if(valor == 11)valor = "j";
        else if(valor == 12)valor = "q";
        else if(valor == 13)valor = "k";
        else valor = valor+"";
        palo = "trebol";
        cartaNueva = new Carta("assets/img/"+palo+"/"+valor+".png",palo,valor);
        this.baraja.push(cartaNueva);
      }
      else if(index <= 38)
      {
        valor = index+1;
        valor -= 26;
        if(valor == 1)valor = "a";
        else if(valor == 11)valor = "j";
        else if(valor == 12)valor = "q";
        else if(valor == 13)valor = "k";
        else valor = valor+"";
        palo = "diamante";
        cartaNueva = new Carta("assets/img/"+palo+"/"+valor+".png",palo,valor);
        this.baraja.push(cartaNueva);
      }
      else if(index <= 52)
      {
        valor = index+1;
        valor -= 39;
        if(valor == 1)valor = "a";
        else if(valor == 11)valor = "j";
        else if(valor == 12)valor = "q";
        else if(valor == 13)valor = "k";
        else valor = valor+"";
        palo = "corazon";
        cartaNueva = new Carta("assets/img/"+palo+"/"+valor+".png",palo,valor);
        this.baraja.push(cartaNueva);
      }
    }
  }

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false)
  {
    if( this.mensajeActivo == false)
    {
      this.mensajeActivo = true;
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
        modelo.mensajeActivo = false;
        x.className = x.className.replace("show", "");
      }, 2000);
    }
   }

  ngOnInit()
  {
  }

}
