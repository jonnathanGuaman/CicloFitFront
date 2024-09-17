import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  userloginOn:boolean = false;

  constructor(private router:Router, private loginService:LoginService, private cdr: ChangeDetectorRef){}
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userloginOn) =>{
          this.userloginOn = userloginOn
        }
      }
    )
  }

  inicio(){
    this.router.navigateByUrl("/inicio");
  }
  rutina(){
    this.router.navigateByUrl("/rutina");
  }

  ejercicios(){
    this.router.navigateByUrl("/ejercicios");
  }
  iniciar_sesion(){
    this.router.navigateByUrl("/iniciar-sesion");
  }

  logout(){
    this.loginService.logOut();
    this.router.navigate(['/iniciar-sesion']).then(()=> window.location.reload());
  }
}
