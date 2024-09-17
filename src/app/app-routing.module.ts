import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RutinaComponent } from './pages/rutina-dashboar/rutina.component';
import { RutinaCreateComponent } from './pages/rutina-create/rutina-create.component';
import { EjercicioCreateComponent } from './pages/ejercicio-create/ejercicio-create.component';
import { EjerciciosComponent } from './pages/ejercicios/ejercicios.component';


const routes: Routes = [
  {
    path: '',
    redirectTo:'/iniciar-sesion',
    pathMatch:'full'
  },
  {
    path: 'inicio',
    component:DashboardComponent
  },
  {
    path: 'iniciar-sesion',
    component:LoginComponent
  },
  {
    path: 'register',
    component:RegisterComponent 
  },
  {
    path: 'rutina',
    component:RutinaComponent 
  },
  {
    path:'rutinaCreate',
    component:RutinaCreateComponent
  },
  {
    path:'rutinaCreate/:id',
    component:RutinaCreateComponent
  },
  {
    path:'ejercicioCreate',
    component:EjercicioCreateComponent
  },{
    path:'ejercicioCreate/:id',
    component:EjercicioCreateComponent
  },
  {
    path:'ejercicios',
    component:EjerciciosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
