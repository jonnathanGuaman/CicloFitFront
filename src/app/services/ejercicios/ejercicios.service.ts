import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ejercicio } from './ejercicios';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { EjercicioClass } from './ejercicioClass';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  constructor(private http:HttpClient) { }

  getEjercicio():Observable<Ejercicio[]>{
    return this.http.get<Ejercicio[]>(environment.urlApi+"ejercicio");
  }

  createEjercicios(ejercicio:Ejercicio):Observable<Ejercicio>{
    return this.http.post<Ejercicio>(environment.urlApi + "ejercicio",ejercicio);
  }

  getEjercicioById(id:number):Observable<Ejercicio>{
    return this.http.get<Ejercicio>(`${environment.urlApi + "ejercicio"}/${id}`)
  }
  eliminarEjercicio(id:number):Observable<Ejercicio>{
    return this.http.delete<Ejercicio>(`${environment.urlApi + "ejercicio"}/${id}`)
  }
  modificarEjerciciosInicio(ejercicio:EjercicioClass):Observable<EjercicioClass>{
    return this.http.post<Ejercicio>(environment.urlApi + "ejercicio",ejercicio);
  }
}
