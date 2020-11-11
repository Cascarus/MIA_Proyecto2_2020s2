import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component'
import { NavigationComponent } from './components/navigation/navigation.component'
import { RegisterComponent } from './components/register/register.component'
import { ConfirmationRegisterComponent } from './components/confirmation-register/confirmation-register.component';
import { RestartPassComponent } from './components/restart-pass/restart-pass.component'
import { ResetPassComponent } from './components/reset-pass/reset-pass.component'
import { HomeComponent } from './components/home/home/home.component';
import { CarritoComponent } from './components/home/carrito/carrito.component';
import { AdminComponent } from './components/admin/admin.component'
import { NuevoProductoComponent } from './components/home/nuevo-producto/nuevo-producto.component'
import { DetalleProductoComponent } from './components/home/detalle-producto/detalle-producto.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user/test',
    component: NavigationComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'confirmation/:id',
    component: ConfirmationRegisterComponent
  },
  {
    path: 'restart-password',
    component: RestartPassComponent
  },
  {
    path: 'reset-password/:id',
    component: ResetPassComponent 
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user/cart',
    component: CarritoComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'user/add-product',
    component: NuevoProductoComponent
  },
  {
    path: 'user/view-product/:id',
    component: DetalleProductoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
