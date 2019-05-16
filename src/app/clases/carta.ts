export class Carta
{
  public foto: string;
  public palo: string;
  public numero: string;

  constructor(foto?: string,palo?: string,numero?: string) 
  {
    if(foto) this.foto = foto;
    else this.foto = "assets/img/fantasma.png";
    if(palo) this.palo = palo;
    else this.palo = "fantasma";
    if(numero) this.numero = numero;
    else this.numero = "0";
  }
}
