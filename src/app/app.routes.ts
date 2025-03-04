import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CursosComponent} from "./dashboard/Pages/cursos/cursos.component";
import {UsuariosComponent} from "./dashboard/Pages/usuarios/usuarios.component";
import {HomeComponent} from "./dashboard/Pages/home/home.component";
import {MatriculaComponent} from "./dashboard/Pages/matricula/matricula.component";

export const routes: Routes = [
  {
    path:'menu',
    component:DashboardComponent,
  children:[
    {
      path:'Inicio',
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
    }
  ]},

  {path:'',redirectTo:'/menu',pathMatch:'full'},
];
