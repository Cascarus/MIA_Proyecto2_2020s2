import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  API_URI = 'http://localhost:3000'


  constructor(private http: HttpClient) { }

  getProduct(id:any){
    console.log('al sevice llega');
    console.log(id);
    return this.http.post(`${this.API_URI}/product/`, id);  
  }

  addCart(objeto:any){
    console.log("llego al servicio addcart")
    return this.http.post(`${this.API_URI}/product/cart/add`,objeto)
  }
  
  getCarrito(id:string){
    console.log("llego al servicio getCart");
    return this.http.get(`${this.API_URI}/product/cart/${id}`);
  }

  deleteOneDet(val:any){
    return this.http.post(`${this.API_URI}/product/cart/delete`,val);
  }

  buy(objeto:any){
    return this.http.post(`${this.API_URI}/product/buy`,objeto);
  }

  deleteCart(obj:any){
    return this.http.post(`${this.API_URI}/product/cart/deleteC`,obj);
  }

  getCategory(){
    return this.http.get(`${this.API_URI}/product/categoria`)
  }

  addProduct(obj:any){
    return this.http.post(`${this.API_URI}/product/add`,obj);
  }

  getOneProd(id:string){
    return this.http.get(`${this.API_URI}/product/get/${id}`);
  }

  addLike(obj:any){
    return this.http.post(`${this.API_URI}/product/like`,obj);
  }
  
  addDislike(obj:any){
    return this.http.post(`${this.API_URI}/product/dislike`,obj);
  }

}
