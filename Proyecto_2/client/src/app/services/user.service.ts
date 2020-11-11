import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI = 'http://localhost:3000'


  constructor(private http: HttpClient) { }

  getUser(id:string){
    return this.http.get(`${this.API_URI}/user/get/${id}`)
  }

  login(user: User){
    return this.http.post(`${this.API_URI}/user/login`, user);
  }

  createUser(user: User){  
    return this.http.post(`${this.API_URI}/user/create`, user)
  }

  sendCorreo(user: User){
    return this.http.post(`${this.API_URI}/user/enviar`,user);
  }

  getPaises(){
    return this.http.get(`${this.API_URI}/user/paises`);
  }

  verifyUsr(id:string){
    return this.http.get(`${this.API_URI}/user/verify-email/${id}`);
  }

  restartPass1(user: any){
    return this.http.post(`${this.API_URI}/user/restart-pass`, user);
  }

  restartPass2(user:any){
    return this.http.post(`${this.API_URI}/user/restart-pass/${user.id}`,user)
  }

  crateCompra(usr:any){
    return this.http.post(`${this.API_URI}/user/create/compra`, usr);
  }

  getSesion(){
    let user_string = localStorage.getItem('currentUsr');
    return JSON.parse(user_string);
  }

  updateSession(){
    var temp = this.getSesion();

    this.getUser(temp.id).subscribe(
      res=>{ 
        console.log("respuesta del update");
        console.log(res)
        localStorage.removeItem("currentUsr");
        let user_string = JSON.stringify(res);
        localStorage.setItem('currentUsr',user_string);
      },
      err=> console.log(err)
    );
  }

  limpiarSesion(){
    localStorage.removeItem("currentUsr");
  }

  sendFactura(obj:any){
    return this.http.post(`${this.API_URI}/user/sendFactura`,obj);
  }

  sendVenta(obj:any){
    return this.http.post(`${this.API_URI}/user/sendVenta`,obj);
  }

  addBitacora(obj:any){
    return this.http.post(`${this.API_URI}/user/bitacora`, obj);
  }

}
