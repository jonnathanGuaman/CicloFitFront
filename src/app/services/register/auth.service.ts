import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from './auth';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  
  constructor(private http:HttpClient) { }

  registerAuth(auth:Auth):Observable<Auth>{
    return this.http.post<Auth>(environment.urlHost+"public/v1/auth",auth,{headers:this.httpHeaders})
  }

  getPersonForName(nombre:String):Observable<Auth>{
    return this.http.get<Auth>(`${environment.urlHost+"public/v1/authGet"}/${nombre}`)
  }
}
