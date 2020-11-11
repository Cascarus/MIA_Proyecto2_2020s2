import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  API_URI = 'http://localhost:3000'


  constructor(private http: HttpClient) { }

  getRep1(){
    return this.http.get(`${this.API_URI}/admin/report_1`);
  }

  getRep1_(id:string){
    console.log("llego a service con " + id);
    return this.http.get(`${this.API_URI}/admin/report_1/${id}`);
  }

  getRep2(){
    return this.http.get(`${this.API_URI}/admin/report_2`);
  }

  getRep3(){
    return this.http.get(`${this.API_URI}/admin/report_3`);
  }

  getRep4(){
    return this.http.get(`${this.API_URI}/admin/report_4`);
  }

  getRep5a(){
    return this.http.get(`${this.API_URI}/admin/report_5a`);
  }

  getRep5b(){
    return this.http.get(`${this.API_URI}/admin/report_5b`);
  }

  getRep6(){
    return this.http.get(`${this.API_URI}/admin/report_6`);
  }

  getRep7(){
    return this.http.get(`${this.API_URI}/admin/report_7`);
  }

  getRep8(){
    return this.http.get(`${this.API_URI}/admin/report_8`);
  }

}
