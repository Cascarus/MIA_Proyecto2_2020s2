import { Component, OnInit, ɵConsole } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentStmt } from '@angular/compiler';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  detalle: any = [];
  Total: number = 0;

  constructor(private homeServices: HomeService, private userService:UserService, private router: Router) { }

  ngOnInit() {
    this.getCarrito();
    this.userService.updateSession()
  }

  getCarrito(){
    this.Total = 0;
    var temp = this.userService.getSesion();
    console.log("el temp de carrito");
    console.log(temp);
    this.homeServices.getCarrito(temp.id).subscribe(
      res=>{
        this.detalle = res;
        console.log(this.detalle)
        
        for(let det of this.detalle){
          this.Total = det.SUB_TOTAL + this.Total;
        }
        console.log(this.Total);
      },
      err=> console.log(err)
    );
  }

  deleteOneDet(idCarrito,idProd){
    let temp = {
      COD_CARRITO: idCarrito,
      COD_PRODUCTO: idProd,   
    }

    console.log(temp);
    this.homeServices.deleteOneDet(temp).subscribe(
      res=> { 
        this.getCarrito();
        console.log(res);
        this.addBitacora('Usuario elimino un producto del carrito');
      },
      err=> console.log(err)
      
    );
  }

  deleteAllDet(){
    for(let det of this.detalle){
      let temp = {
        COD_CARRITO: det.COD_CARRITO,
        COD_PRODUCTO: det.COD_PRODUCTO,   
      }
  
      console.log(temp);
      this.homeServices.deleteOneDet(temp).subscribe(
        res=> { 
          this.getCarrito();
          console.log(res);
          this.addBitacora('Usuario elimino todo su carrito');
        },
        err=> console.log(err)
        
      );
    }  
  }

  regresar(){
    this.router.navigate(['home']);
  }

  startBuy(){
    this.buyCart();
    this.deleteCart();
    this.sendFactura();
    this.userService.updateSession();
  }

  buyCart(){
    var temp = this.userService.getSesion();
    var diferencia = temp.creditos - this.Total;
    console.log(diferencia);
    
    if(diferencia < 0){
      alert("Creditos insuficientes para realizar la compra");
      return;
    }

    let compra = {
      usr: temp.id,
      fecha: new Date().getFullYear() + '/' +  new Date().getMonth() + '/' + new Date().getDate(),
    }

    console.log(compra);

    this.userService.crateCompra(compra).subscribe(
      res=> { 
        //console.log(res);
        var comp = res[0];
        console.log(comp);
        for(let det of this.detalle){
          let temp = {
            COD_COMPRA: comp.COD_COMPRA,
            COD_PRODUCTO: det.COD_PRODUCTO,
            CANT: det.CANTIDAD,
            PRECIO: det.PRECIO,
            SUB: det.SUB_TOTAL,   
          }
          console.log('lleva a comprar');
          console.log(temp);
          this.homeServices.buy(temp).subscribe(
            res=>{
              console.log(res);
            },
            err=> console.log(err)
          );
        }
        this.addBitacora('Usuario confirmo pedido');
      },
      err=> console.log(err)
    );
  }

  deleteCart(){
    var temp = this.userService.getSesion();
    let cart = {
      COD_USUARIO: temp.id,
      COD_CARRITO: this.detalle[0].COD_CARRITO,
      FECHA: new Date().getFullYear() + '/' +  new Date().getMonth() + '/' + new Date().getDate(),
    }

    console.log(cart);

    this.homeServices.deleteCart(cart).subscribe(
      res=>{
        console.log(res);
        alert('Su factura ha sido enviada al correo');
      },
      err=> console.log(err)
    );

  }

  sendFactura(){
    var temp = this.userService.getSesion();

    let fact = {
      Nombre: temp.nombre,
      Correo: temp.correo,
      Prod: this.detalle,
      Total: this.Total,
    }

    this.userService.sendFactura(fact).subscribe(
      res=>{
        console.log(res);
      },
      err=> console.log(err)
    );
    
    for(let det of this.detalle){
      this.userService.sendVenta(det).subscribe(
        res=>{
          console.log(res);
        },
        err=>console.log(err)
      );
    }
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

}
