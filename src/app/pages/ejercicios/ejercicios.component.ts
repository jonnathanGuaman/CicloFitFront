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

  constructor(private ejercicioSerice:EjerciciosService,private rutinaServices:RutinaService){
  }
  
  rutina:Rutina[]=[];
  ejercicio:Ejercicio[]=[]

  ngOnInit(): void {
    const userId = <number><unknown>sessionStorage.getItem('id');

    this.rutinaServices.getRutina().subscribe(rutina => {
      this.rutina = rutina.filter( (auxRutina) => auxRutina.id_usuario == userId);
      const rutinaIds = this.rutina.map(r => r.id);
      this.ejercicioSerice.getEjercicio().subscribe(ejercicio => {
      this.ejercicio = ejercicio.filter((ej) => rutinaIds.includes(ej.id_rutina))
    });
    })
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
