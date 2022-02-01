import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guard/auth.guard';


const routes: Routes=[
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then( m=> m.AuthModule)
    
  },
  {
    path:'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m=> m.HeroesModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path:'404',
    component: ErrorPageComponent,
  }, 
  {
    path:'**',
    redirectTo: '404',
    
  }
]
@NgModule({
  declarations: [],
  imports: [  
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],  
})
export class AppRoutingModule { }
