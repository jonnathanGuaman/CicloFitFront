import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';
import { environment } from '../../../environment/environment';
import { AuthService } from '../../services/register/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginSucces:boolean = false
  loginError:String="";

  constructor(private fb:FormBuilder, private router:Router, private loginService:LoginService,private authService:AuthService){}
  
  loginForm = this.fb.group({
    username:['',[Validators.required, Validators.email]],
    password:['',Validators.required]
  })


  get email(){
    return this.loginForm.controls.username;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next:() => {
          this.loginSucces = true 
          this.authService.getPersonForName(this.email.value!).subscribe(
            (auth)=>{
              sessionStorage.setItem("id",<string><unknown>auth.id_usuario);
            }
          );
        },
        error: (errorData) => {
          this.loginError = errorData;
        },
        complete: () => {
          this.router.navigateByUrl("/inicio");
          this.loginForm.reset();
        }
      });
    }else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos");
    }
  }


}
