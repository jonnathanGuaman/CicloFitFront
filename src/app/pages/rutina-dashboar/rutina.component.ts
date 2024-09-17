import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RutinaService } from '../../services/rutina/rutina.service';
import { environment } from '../../../environment/environment';
import { Rutina } from '../../services/rutina/rutina';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrl: './rutina.component.css'
})
export class RutinaComponent implements OnInit{


  rutina:Rutina[]=[];
  constructor(private rutinaServices:RutinaService){}

  ngOnInit(): void {
    this.rutinaServices.getRutina().subscribe(rutina => this.rutina = rutina)
  }
  
  eliminar(id=0){
    Swal.fire({
      title: '¿Seguro que deseas eliminar la rutina?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rutinaServices.eliminarRutina(id).subscribe(() => {
          this.rutina = this.rutina.filter(rutina => rutina.id != id);
          Swal.fire(
            'Eliminado!',
            'La rutina ha sido eliminado.',
            'success'
          );
        });
      }
    });
  }

}
