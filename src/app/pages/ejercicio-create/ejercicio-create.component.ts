import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RutinaService } from '../../services/rutina/rutina.service';
import { Rutina } from '../../services/rutina/rutina';
import { EjerciciosService } from '../../services/ejercicios/ejercicios.service';
import { Ejercicio } from '../../services/ejercicios/ejercicios';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ejercicio-create',
  templateUrl: './ejercicio-create.component.html',
  styleUrl: './ejercicio-create.component.css'
})
export class EjercicioCreateComponent implements OnInit{

  dias:string[] = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sábado","Domingo"];
  rutina:Rutina[]=[];
  idRutinaSelec!:number;

  constructor(private activedRouter:ActivatedRoute, private router:Router, private fb:FormBuilder, private rutinaService:RutinaService, private ejercicioService:EjerciciosService){}
  
  ngOnInit(): void {
    this.cargarEjercicio();
    this.rutinaService.getRutina().subscribe(rutina => this.rutina = rutina)
  }
  ejercicioForm = this.fb.group({
    idEjercicio:[''],
    id_rutina:[this.idRutinaSelec,Validators.required],
    nombreEjercicio:['',Validators.required],
    diaSemana: ['',Validators.required],
    reps:[''],
    pesoAlcanzado:[''],
    series:['',Validators.required],
  })

  get idEjercicio(){
    return this.ejercicioForm.controls.idEjercicio
  }
  get id_rutina(){
    return this.ejercicioForm.controls.id_rutina
  }
  get nombreEjercicio(){
    return this.ejercicioForm.controls.nombreEjercicio
  }
  get diaSemana(){
    return this.ejercicioForm.controls.diaSemana
  }
  get reps(){
    return this.ejercicioForm.controls.reps
  }
  get pesoAlcanzado(){
    return this.ejercicioForm.controls.pesoAlcanzado
  }
  get series(){
    return this.ejercicioForm.controls.series
  }
  
  cancelar(){
    Swal.fire({
      title: '¿Seguro que deseas cancelar?',
      text: "¡Se eliminara el progreso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl("/ejercicios")
      }
    });
  }

  crearEjercicio(){
    if(!this.ejercicioForm.invalid){
      this.ejercicioService.createEjercicios(this.ejercicioForm.value as unknown as Ejercicio).subscribe({
        complete: ()=>{
          Swal.fire('Ejercicio registrado','Ejercicio registrado con exito','success').then(()=>{
            this.router.navigateByUrl("/ejercicios")
          })
        },
        error: ()=>{
          Swal.fire('Error', 'Lo sentimos algo salio mal','error')
        }
      })
    }else{
      this.ejercicioForm.markAllAsTouched();
    }
  }

  cargarEjercicio(){
    this.activedRouter.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.ejercicioService.getEjercicioById(id).subscribe((ejercicio) => {
          console.log(ejercicio.diaSemana)
          this.idEjercicio.setValue(<string><unknown>ejercicio.idEjercicio)
          this.id_rutina.setValue(ejercicio.id_rutina)
          this.nombreEjercicio.setValue(ejercicio.nombreEjercicio)
          this.diaSemana.setValue(ejercicio.diaSemana)
          this.reps.setValue(ejercicio.reps)
          this.pesoAlcanzado.setValue(ejercicio.pesoAlcanzado)
          this.series.setValue(<string><unknown>ejercicio.series)
        })
      }
    })
  }
}
