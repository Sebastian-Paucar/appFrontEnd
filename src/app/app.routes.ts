import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CursosComponent} from "./dashboard/Pages/cursos/cursos.component";
import {UsuariosComponent} from "./dashboard/Pages/usuarios/usuarios.component";
import {HomeComponent} from "./dashboard/Pages/home/home.component";
import {MatriculaComponent} from "./dashboard/Pages/matricula/matricula.component";
import {LogoutComponent} from "./dashboard/Pages/logout/logout.component";
import {LoginComponent} from "./dashboard/Pages/login/login.component";
import {authGuard} from "./services/auth.guard";

export const routes: Routes = [
  {
    path:'menu',
    component:DashboardComponent,
    canActivate: [authGuard],
  children:[
    {
      path:'authorize',
      title:'Inicio',
      component:HomeComponent
    },
    {
      path:'cursos',
      title:'Cursos',
      component:CursosComponent,
    },{
      path:'usuarios',
      title:'Usuarios',
      component:UsuariosComponent
    },
    {
      path:'Matriculas',
      title:'Matriculas',
      component:MatriculaComponent
    },
    {
      path:'logout',
      title:'Logout',
      component:LogoutComponent
    }
  ]},
  {
    path:'login',
    component:LoginComponent
  },
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];
