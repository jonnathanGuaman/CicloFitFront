import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Rutina } from './rutina';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  constructor(private http:HttpClient) { 
  }

  getRutina():Observable<Rutina[]>{
    return this.http.get<Rutina[]>(environment.urlApi+"rutina");
  }

  registroRutina(rutina:Rutina):Observable<Rutina>{
    return this.http.post<Rutina>(environment.urlApi+"rutina",rutina);
  }

  eliminarRutina(id:number):Observable<Rutina>{
    return this.http.delete<Rutina>(`${environment.urlApi+"rutina"}/${id}`)
  }

  getRegistroById(id:number):Observable<Rutina>{
    return this.http.get<Rutina>(`${environment.urlApi+"rutina"}/${id}`);
  }
}
