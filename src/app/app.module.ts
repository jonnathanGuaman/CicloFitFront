import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { RegisterComponent } from './pages/register/register.component';
import { RutinaComponent } from './pages/rutina-dashboar/rutina.component';
import { RutinaCreateComponent } from './pages/rutina-create/rutina-create.component';
import { EjercicioCreateComponent } from './pages/ejercicio-create/ejercicio-create.component';
import { EjerciciosComponent } from './pages/ejercicios/ejercicios.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    RegisterComponent,
    RutinaComponent,
    RutinaCreateComponent,
    EjercicioCreateComponent,
    EjerciciosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptorService,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
