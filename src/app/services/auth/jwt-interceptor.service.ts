import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private loginService:LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token:String = this.loginService .userToken

    if(token!=""){

      req = req.clone(
        {
          setHeaders:{
            'Content-Type':'application/json;charset=utf-8',
            'Accep' : 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      )
    }
    return next.handle(req)
  }
}
