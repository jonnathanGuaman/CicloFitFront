import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usario';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  
  constructor(private http:HttpClient) { }

  registerPerson(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(environment.urlHost+"public/v1/usuario",usuario,{headers:this.httpHeaders})
  }

}
