import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  ocultarElementos:boolean;

  constructor(private route: ActivatedRoute,
    private router: Router)
    {
      this.ocultarElementos = true;
    }

  ngOnInit() {
  }

  Toggle()
  {
    if(this.ocultarElementos != false) this.ocultarElementos = false;
    else this.ocultarElementos = true;
  }

  Juego(tipo: string) {
    switch (tipo)
    {
      case 'Adivina':
          this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
          this.router.navigate(['/Juegos/Agilidad']);
        break;
        case 'Anagrama':
        this.router.navigate(['/Juegos/Anagrama']);
        break;
        case 'Tateti':
        this.router.navigate(['/Juegos/Tateti']);
      break;
        case 'Blackjack7':
        this.router.navigate(['/Juegos/Blackjack7']);
        break;
        case 'PPT':
        this.router.navigate(['/Juegos/PiedraPapelTijera']);
      break;
    }
  }

}
