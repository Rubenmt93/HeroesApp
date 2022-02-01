import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor( private router:Router,
               private authService:AuthService) { }

  ngOnInit(): void {
  }
  
  login(){
    //ir al backend
    // obtener un usuario 
    //guardar en un servicio
    this.authService.login()
    .subscribe(resp => {
      console.log(resp);
      if(resp.id){
        this.router.navigate(['/heroes'])
      }    
    })
    //enrutar
    //

  }

  entrarsinlogin(){
    this.authService.logout();
    this.router.navigate(['/heroes'])
  }
}
