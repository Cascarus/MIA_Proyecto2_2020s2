import { Component, OnInit, HostBinding } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  @HostBinding('class') classes = 'row';

  products: any = [];

  tempCar:any = {
    idUsr: 0,
    cod_product: 0,
    cant: 0,
    precio: 0,
    subTotal: 0
  }

  constructor(private homeServices: HomeService, private userService: UserService, private router:Router) { }

  ngOnInit() {
    var temp = this.userService.getSesion();
    console.log("el temp de home");
    console.log(temp);
    this.homeServices.getProduct(temp).subscribe(
      res=>{
        this.products = res;
        console.log(this.products)
      },
      err=> console.log(err)
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
    this.homeServices.addCart(this.tempCar).subscribe(
      res=> {
        alert('Anadido al carrito');
        console.log(res);
        this.addBitacora('Se añadio el producto ' + this.tempCar.cod_product+' al carrito');
      },
      err => console.log(err)
      
    );
  }

  detalleProd(id:string){
    console.log("ejecuto el detProd")
    this.router.navigate(['user/view-product/'+id]);
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
