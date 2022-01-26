import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators'
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [ `
  img{
    width:100%;
    border-radius: 8px;
  }
  `
  ]
})
export class HeroeComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute, 
               private heroesService:HeroesService,
               private router:Router) { }
  heroe!:Heroe;
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( params => this.heroesService.getHeroe(params.id))
      )
    .subscribe(heroe => this.heroe=heroe)
  }
  regresar(){
    this.router.navigate(['/heroes/'])
  }


}
