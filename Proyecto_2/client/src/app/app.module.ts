import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { UserService } from './services/user.service';
import { ImageService } from './services/image.service'
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationRegisterComponent } from './components/confirmation-register/confirmation-register.component';
import { RestartPassComponent } from './components/restart-pass/restart-pass.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { HomeComponent } from './components/home/home/home.component';
import { CarritoComponent } from './components/home/carrito/carrito.component';
import { AdminComponent } from './components/admin/admin.component';
import { NuevoProductoComponent } from './components/home/nuevo-producto/nuevo-producto.component';
import { DetalleProductoComponent } from './components/home/detalle-producto/detalle-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    RegisterComponent,
    ConfirmationRegisterComponent,
    RestartPassComponent,
    ResetPassComponent,
    HomeComponent,
    CarritoComponent,
    AdminComponent,
    NuevoProductoComponent,
    DetalleProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
