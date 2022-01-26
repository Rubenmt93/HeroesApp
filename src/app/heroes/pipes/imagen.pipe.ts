import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen',
  pure: false,
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    if(!heroe.id){
      return "assets/no-image.png"
    }
    if(!heroe.alt_img){
      return "assets/heroes/"+heroe.id+".jpg";
    }
    return heroe.alt_img
  }

}
