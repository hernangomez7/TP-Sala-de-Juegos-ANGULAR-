export class Ficha_tateti
{
  public foto: string;
  public estado: string;

  constructor(foto?: string,estado?:string) 
  {
    this.foto = "assets/img/tateti_ficha_vacia.png";
    this.estado = "vacio";
  }

  CambiarFichaAVacia()
  {
    this.foto = "assets/img/tateti_ficha_vacia.png";
    this.estado = "vacio";
  }

  CambiarFichaACirculo()
  {
    this.foto = "assets/img/tateti_ficha_circulo.png";
    this.estado = "circulo";
  }

  CambiarFichaACruz()
  {
    this.foto = "assets/img/tateti_ficha_cruz.png";
    this.estado = "cruz";
  }


  
}
