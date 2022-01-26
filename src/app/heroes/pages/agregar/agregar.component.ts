import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id:'DC Comics',
      desc:'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc:'Marvel - Comics'
    }
  ];
  heroe:Heroe ={
    superhero:'',
    alter_ego:'',
    characters: '',
    first_appearance:'',
    publisher: Publisher.DCComics,
    alt_img:'',
  }
  constructor( private  heroesService:HeroesService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog, ){ }

  ngOnInit(): void {

    if(this.router.url.includes('editar')){
      this.activatedRoute.params
      .pipe(
          switchMap( ({id}) => this.heroesService.getHeroe( id ))
      )
      .subscribe(  heroe => this.heroe=heroe);
      }
    
  
  }
  guardar(){
    if(this.heroe.superhero.trim().length ===0){
      return;
    }
    
    if (this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(heroe => this.mostrarSnackBar("Registro Actualizado"))
    }else{
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe( resp =>{
        console.log( resp);
        this.router.navigate(['/heroes/editar',resp.id])
        this.mostrarSnackBar("Registro Creado")
      })
     
    }
    
  }
  borrarHeroe(){
    const dialog=this.dialog.open(ConfirmarComponent, {
      width: '25%',
      data: { ...this.heroe}   //mando copia

    });

    dialog.afterClosed().subscribe( resp => {
      if(resp){
        this.heroesService.borrarHeroe (this.heroe.id !)
        .subscribe( resp => {
            this.router.navigate(['/heroes'])
            this.mostrarSnackBar("Heroe Borrado")
        })
      }
    })

    
  }
  mostrarSnackBar( mensaje:string){
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    })
  }
}
