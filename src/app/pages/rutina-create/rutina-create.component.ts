import { Component } from '@angular/core';
import { Rutina } from '../../services/rutina/rutina';
import { FormBuilder, Validators } from '@angular/forms';
import { RutinaService } from '../../services/rutina/rutina.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rutina-create',
  templateUrl: './rutina-create.component.html',
  styleUrl: './rutina-create.component.css',
})
export class RutinaCreateComponent {
  fechaActual: string = '';

  rutina: Rutina[] = [];

  ejerciciosDeRutina: Rutina[] = [];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private rutinaServices: RutinaService,
    private activedRoute:ActivatedRoute
  ) {}

  private rutinaEnviar:Rutina = new Rutina();
  
  ngOnInit(): void {
    this.cargarRutina();
    const userId = <number><unknown>sessionStorage.getItem('id');

    this.rutinaServices.getRutina().subscribe(rutina => {
      this.rutina = rutina.filter( (auxRutina) => auxRutina.id_usuario == userId);
    })
  }

  rutinaForm = this.fb.group({
    id:[''],
    nombreRutina: ['', Validators.required],
    id_usuario: [sessionStorage.getItem('id')],
    fechaCreacion: [this.fechaActual],
    diasDeEntreno: [0,[Validators.required, Validators.min(3), Validators.max(6)]],
    
  });

  get id() {
    return this.rutinaForm.controls.id;
  }

  get nombreRutina() {
    return this.rutinaForm.controls.nombreRutina;
  }

  get id_usuario() {
    return this.rutinaForm.controls.id_usuario;
  }

  get diasDeEntreno() {
    return this.rutinaForm.controls.diasDeEntreno;
  }

  get fechaCreacion() {
    return this.rutinaForm.controls.fechaCreacion;
  }

  guardar() {
    if (!this.rutinaForm.invalid) {
      let fecha = new Date();

      this.rutinaEnviar.diasEntrenamiento = this.diasDeEntreno.value!
      this.rutinaEnviar.fechaCreacion = fecha
      this.rutinaEnviar.id_usuario = <number><unknown>this.id_usuario.value!
      this.rutinaEnviar.nombreRutina = this.nombreRutina.value!
      this.rutinaEnviar.id = <number><unknown>this.id.value!
      this.rutinaServices.registroRutina(this.rutinaEnviar).subscribe({
          complete: () => {
            Swal.fire(
              'Registrado con exito',
              'La rutina se ha registrado con exito',
              'success'
            ).then(() => {
              this.router.navigateByUrl('/rutina');
            });
          }
        });
    }else{
      this.rutinaForm.markAllAsTouched();
    }
  }

  accionbtnCancelar(){  
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
        this.router.navigateByUrl("/rutina")
      }
    });
  }
  
  cargarRutina(){
    this.activedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.rutinaServices.getRegistroById(id).subscribe((rutina) => {
          this.nombreRutina.setValue(rutina.nombreRutina),
          this.diasDeEntreno.setValue(rutina.diasEntrenamiento)
          this.id_usuario.setValue(<string><unknown>rutina.id_usuario)
          this.fechaCreacion.setValue(<string><unknown>rutina.fechaCreacion)
          this.id.setValue(<string><unknown>rutina.id)
        }
        )
      }
    })
  }
}
