import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../services/auth/user';
import { Auth } from '../../services/register/auth';
import { RegisterService } from '../../services/register/register.service';
import { AuthService } from '../../services/register/auth.service';
import { Usuario } from '../../services/register/usario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  showPassword: boolean = false;
  variableContrasena:string ="password";
  
  constructor(private router:Router, private fb:FormBuilder, private usuarioService:RegisterService,
              private authService:AuthService, private loginService:LoginService){}
  private auxAuth:Auth = new Auth(); 

  registerForm = this.fb.group({
    nombre:['',Validators.required],
    apellido:['',Validators.required],
    cedula:['',Validators.required],
    fecha_nacimiento:['',Validators.required],
  })

  registoAuth = this.fb.group({
    username:['',[Validators.required, Validators.email]],
    password:['',Validators.required],
  })

  get nombre(){
    return this.registerForm.controls.nombre;
  }
  get apellido(){
    return this.registerForm.controls.apellido;
  }

  get cedula(){
    return this.registerForm.controls.cedula;
  }

  get fechaNacimiento(){
    return this.registerForm.controls.fecha_nacimiento;
  }

  get email(){
    return this.registoAuth.controls.username;
  }

  get password(){
    return this.registoAuth.controls.password;
  }

  botonParaVerContrasena(): void {
    this.showPassword = !this.showPassword;
    if(this.variableContrasena === "password"){
      this.variableContrasena = "text"
    }else{
      this.variableContrasena = "password"
    }
  }

  registro(){
    if(this.registerForm.valid && this.registoAuth.valid){
      this.usuarioService.registerPerson(this.registerForm.value as unknown as Usuario).subscribe({
        next:(usuarioRegister) =>{
          sessionStorage.setItem("id",<string><unknown>usuarioRegister.id_usuario);
          this.auxAuth.id_usuario = usuarioRegister.id_usuario
          this.auxAuth.username = this.email.value!
          this.auxAuth.password = this.password.value!
          this.authService.registerAuth(this.auxAuth).subscribe()
        },
        error: () => {
          Swal.fire('Error','Cedula o correo ya registrados','error')
        },
        complete: () => {
          Swal.fire('Usuario registrado', `Usuario registrado con exito`, 'success').then(()=>{
            this.loginService.login(this.registoAuth.value as LoginRequest).subscribe({
              complete:()=>{
                this.router.navigateByUrl("/inicio");
                this.registerForm.reset();
              }
            })
          })
        }
      });
    }else{
      this.registerForm.markAllAsTouched();
      this.registoAuth.markAllAsTouched();
    }
  }
}
