import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit
{
  nuevoJuego: JuegoAnagrama;
  listaPalabras:any;
  Mensajes:string;
  ocultarVerificar:boolean;


  constructor()
  {
    this.ocultarVerificar=true;
    this.nuevoJuego = new JuegoAnagrama();
    this.listaPalabras = new Array();
    this.CargarLista();
  }

  ngOnInit()
  {
    this.DesordenarPalabra();
  }

  iniciar()
  {
    this.DesordenarPalabra();
  }

  DesordenarPalabra()
  {
    this.nuevoJuego.desordenarPalabra(this.listaPalabras);
  }

  verificar()
  {
    if(this.nuevoJuego.verificar())
    {
      this.MostarMensaje("Correcto",true);
      this.DesordenarPalabra();
    }else{
      this.MostarMensaje("Has fallado",false);
      this.mostrarResultado()
    }
    
  }

  mostrarResultado()
  {
    this.MostarMensaje("la respuesta era:"+this.nuevoJuego.palabraElegida,false);
    this.DesordenarPalabra();
  }



  CargarLista()
  {
    this.listaPalabras.push("acosador","baron","asesino","arbol","maso","arcabucero",
    "alba","lacerar","apalear","alabar","balbucear","abejorro","ristre","quebrar","quijote",
    "dictador","adoctrinar","exterminio","mandoble","milicia","dominar","destruir","mentir","maldecir",
    "desintegrar","masacrar","abalar","ancestral","abdomen","destripar","abaldonar","construir",
    "imperial","eternidad","apaciguar","negociar","reutilizar", "bautizar","falsificar","desmoronar");
  }

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false)
  {
    this.Mensajes = mensaje;    
    var x = document.getElementById("snackbar");
    if(ganador)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }
    var modelo = this;
    setTimeout(function()
    { 
      x.className = x.className.replace("show", "");
      modelo.ocultarVerificar = false;
     }, 3000);
   }

}






