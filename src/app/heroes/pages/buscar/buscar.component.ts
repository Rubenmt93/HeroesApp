import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete/autocomplete';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  termino:string= '';
  heroes: Heroe[]=[];
  heroeSeleccionado: Heroe | undefined;
  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
  }
  buscando(){
    this.heroesService.getSugerencia(this.termino.trim())
    .subscribe(heroes => this.heroes= heroes)

  }
  opcionSelecionada( event:MatAutocompleteSelectedEvent){
  
    
    if(!event.option.value){
      this.heroeSeleccionado= undefined
      return
    }
    const heroe: Heroe = event.option.value
    this.termino = heroe.superhero
    this.heroesService.getHeroe(heroe.id!)
    .subscribe(heroe => this.heroeSeleccionado=heroe)
  }
    


}
