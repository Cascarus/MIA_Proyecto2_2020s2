import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product'
import { ImageService } from '../../../services/image.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  prod: Product = {
    Cod_producto: 0,
    Cod_usuario: this.userService.getSesion().id,
    Producto: '',
    Precio: 0,
    Descripcion: '',
    Likes: 0,
    Dislikes: 0,
    Bloqueado: 0,
    Foto: ''
  }

  tempCat:any = {
    Cod_Categoria: 0,
    Cod_producto: 0  
  }

  categorias:any = [];
  tempPrecio: string;
  foto_file: File; 

  constructor(private userService: UserService, private homeService: HomeService, private imageService: ImageService, private router: Router) { }

  ngOnInit() {
    this.getCategoria();
  }

  getCategoria(){
    this.homeService.getCategory().subscribe(
      res=>{
        this.categorias = res;
        console.log(this.categorias);
      },
      err=>console.log(err)
    );
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.foto_file = <File>event.target.files[0]; //guarda la imagen
      document.getElementById('NameFIle').innerText=this.foto_file.name;
      console.log(this.foto_file);
    }else{
      document.getElementById('NameFIle').innerText='No file chosen';
      this.foto_file=null;
    }
  }

  validateData(){
    delete this.prod.Cod_producto;
    this.prod.Precio = parseInt(this.tempPrecio, 10);

    console.log(this.prod);

    if(isNaN(this.prod.Precio) || this.prod.Precio <= 0 || this.prod.Producto == "" || this.prod.Descripcion == ""){
      alert("El producto debe de llevar un nombre, una descripcion y un precio");
      return;
    }else{
      if(this.foto_file == null){
        alert("Debe de agregar una imagen para el producto");
        return;
      }else{
        this.imageService.create(this.foto_file).subscribe(
          res => {console.log(res);
            var tempI:any=res; 
          
            this.prod.Foto=tempI.text;
            this.createProd();
          },
          err => console.log(err)
        );
      }
    }
  }

  createProd(){
    console.log(this.prod);
    this.homeService.addProduct(this.prod).subscribe(
      res=>{
        console.log(res);
        var tempI:any=res;
        this.tempCat.Cod_producto = tempI.COD_PRODUCTO;
        alert('El producto ha sido creado exitosamente');
      },
      err=> console.log(err)
    );
  }

}
