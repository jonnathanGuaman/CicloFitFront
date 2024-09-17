import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { User } from './user';
import { environment } from '../../../environment/environment';
import { AuthService } from '../register/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http:HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null)
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "")
  }
  
  login(credencial:LoginRequest):Observable<any>{
    return this.http.post<any>(environment.urlHost+"public/login",credencial).pipe(
      tap((userData) => {
        sessionStorage.setItem("token",userData.token)
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userDate) => userDate.token),
      catchError(this.handleError)
    )
  }

  logOut():void{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    this.currentUserLoginOn.next(false);
  }


  
  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.error('Se ha producido un error ' + error)
    }else{
      console.error('El backend retorno el codigo del error ' + error)
    }
    return throwError(() => new Error('Algo falló. Por favor intente de nuevo')); 
  }

  get userDate():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value
  }
}
