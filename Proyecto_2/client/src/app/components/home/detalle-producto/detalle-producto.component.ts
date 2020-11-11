import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../../../services/home.service';
import { UserService } from 'src/app/services/user.service';
import { Console } from 'console';


@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  id:string;
  tempProd:any;
  tempCar:any = {
    idUsr: 0,
    cod_product: 0,
    cant: 0,
    precio: 0,
    subTotal: 0
  }

  constructor(private active:ActivatedRoute, private userService: UserService, private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    const param = this.active.snapshot.params;
    this.id= param.id;
    console.log(this.id);

    this.getProd(this.id)
  }

  getProd(id:string){
    this.homeService.getOneProd(this.id).subscribe(
      res=>{
        console.log(res);
        this.tempProd = res;
      },
      err=>console.log(err)
    );
  }

  setProdId(idProd, precio){
    this.tempCar.cod_product=idProd;
    this.tempCar.precio = precio;
    console.log(this.tempCar);
  }

  addCart(){
    this.tempCar.idUsr=Number(this.userService.getSesion().id);
    this.tempCar.cant= Number(this.tempCar.cant);
    this.tempCar.precio = Number(this.tempCar.precio);
    this.tempCar.subTotal = Number(this.tempCar.precio * this.tempCar.cant);
    
    console.log(this.tempCar)
    this.homeService.addCart(this.tempCar).subscribe(
      res=> {
        alert('Anadido al carrito');
        console.log(res);
        this.addBitacora('Se añadio el producto ' + this.tempCar.cod_product+' al carrito');
      },
      err => console.log(err)
      
    );
  }

  addBitacora(des: string){
    var bit ={
      id: this.userService.getSesion().id,
      descripcion: des,
      fecha: new Date().getFullYear() + '/' +  new Date().getMonth() + '/' + new Date().getDate(),
    }
    this.userService.addBitacora(bit).subscribe(
      res=>{console.log(res);
      },
      err=>console.log(err)
    );
  }

  addLike(){
    var temp ={
      cod_product: this.tempProd.COD_PRODUCTO,
      likes: this.tempProd.LIKES + 1
    }

    this.homeService.addLike(temp).subscribe(
      res=>{
        console.log(res)
        this.getProd(this.id);
      },
      err=>console.log(err)
    );

  }

  addDislike(){
    var temp ={
      cod_product: this.tempProd.COD_PRODUCTO,
      dislikes: this.tempProd.DISLIKES + 1
    }

    this.homeService.addDislike(temp).subscribe(
      res=>{
        console.log(res)
        this.getProd(this.id);
      },
      err=>console.log(err)
    );
  }
}
