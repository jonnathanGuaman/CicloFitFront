import { Component, contentChild, ElementRef, OnDestroy, OnInit, Signal } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Rutina } from '../../services/rutina/rutina';
import { RutinaService } from '../../services/rutina/rutina.service';
import { environment } from '../../../environment/environment';
import { Ejercicio } from '../../services/ejercicios/ejercicios';
import { EjerciciosService } from '../../services/ejercicios/ejercicios.service';
import { EjercicioClass } from '../../services/ejercicios/ejercicioClass';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  
  userloginOn:boolean = false;
  ejercicio:Ejercicio[]=[]
  ejercicioFiltrado:Ejercicio[]=[]
  rutina:Rutina[]=[]
  rutinaSelect!:number;

  constructor(private router:Router, private loginService:LoginService, private rutinaServices:RutinaService,
              private ejercicioService:EjerciciosService){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userloginOn) =>{
          this.userloginOn = userloginOn
        }
      },
    )
    this.rutinaServices.getRutina().subscribe(rutina => this.rutina = rutina);
  }
  
  cargarEjercicioByRutina(){
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const today = new Date();
    const dayOfWeekNumber = today.getDay();
    const dayOfWeekName = daysOfWeek[dayOfWeekNumber];
    //Cambiar este meetodo para que me haga una consulta a la base de solo los ejercicios del
    //usuario que esta logeado y reducir la carga
    this.ejercicioService.getEjercicio().subscribe(ejercico => this.ejercicio = ejercico);
    //Comprobar esto no me devuelve bien el fitro
    this.ejercicioFiltrado = this.ejercicio.filter((ejercicio)=> (ejercicio.id_rutina == this.rutinaSelect) && ejercicio.diaSemana === dayOfWeekName);
  }

  public ejercicioEnviar:EjercicioClass = new EjercicioClass();

  pesoAlcanzado:string="";
  repsEnviar:string="";

  guardarCambio(idEjercicio:number){
    const auxEjercicio = this.ejercicio.find(ejercicio => ejercicio.idEjercicio === idEjercicio);
    this.ejercicioEnviar.id_rutina = this.rutinaSelect;
    this.ejercicioEnviar.idEjercicio = idEjercicio;
    this.ejercicioEnviar.nombreEjercicio = auxEjercicio?.nombreEjercicio;
    this.ejercicioEnviar.series = <number><unknown>auxEjercicio?.reps;
    this.ejercicioEnviar.pesoAlcanzado = this.pesoAlcanzado;
    this.ejercicioEnviar.reps = this.repsEnviar;
    this.ejercicioEnviar.diaSemana = auxEjercicio?.diaSemana;

    if(this.pesoAlcanzado === "" ){
      this.ejercicioEnviar.pesoAlcanzado = auxEjercicio?.pesoAlcanzado
    }
    if(this.repsEnviar === ""){
      this.ejercicioEnviar.reps = auxEjercicio?.reps
    }

    this.ejercicioService.modificarEjerciciosInicio(this.ejercicioEnviar).subscribe({
      complete:()=>{
        Swal.fire('Guardado','Se ha guardado tu progreso de este ejercicio','success').then(()=>{
          this.pesoAlcanzado = "";
          this.repsEnviar = "";
          this.router.navigateByUrl("/inicio").then(()=>{
            window.location.reload();
          })
        })
      }
    })
    
  }
}
