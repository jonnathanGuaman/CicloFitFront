import { Component, OnInit } from '@angular/core';
import { EjerciciosService } from '../../services/ejercicios/ejercicios.service';
import { Ejercicio } from '../../services/ejercicios/ejercicios';
import { RutinaService } from '../../services/rutina/rutina.service';
import { Rutina } from '../../services/rutina/rutina';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.css'
})
export class EjerciciosComponent implements OnInit {

  constructor(private ejercicioSerice:EjerciciosService,private rutinaService:RutinaService){
  }
  
  rutina:Rutina[]=[];
  ejercicio:Ejercicio[]=[]

  ngOnInit(): void {
    this.rutinaService.getRutina().subscribe(rutina => this.rutina = rutina)
    this.ejercicioSerice.getEjercicio().subscribe(ejercicio => this.ejercicio = ejercicio);
  }

  buscarRutina(id:number):string{
    const nombreRutina = this.rutina.find(rutina => rutina.id === id)
    return nombreRutina!.nombreRutina
  }

    eliminarEjercicio(id=0){
    Swal.fire({
      title: '¿Seguro que deseas eliminar el ejercicio?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ejercicioSerice.eliminarEjercicio(id).subscribe(() => {
          this.ejercicio = this.ejercicio.filter(ejercicio => ejercicio.idEjercicio != id);
          Swal.fire(
            'Eliminado!',
            'El ejercicio ha sido eliminado.',
            'success'
          );
        });
      }
    });
  }
}
