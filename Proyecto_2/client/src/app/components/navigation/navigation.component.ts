import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
   
  constructor(private userService: UserService,private router:Router) {   }
  
  credito: number = 0;

  visibility(){
    let sesion = this.userService.getSesion();
      
      if(sesion==null){
        this.allV();
        this.credito = 0;
      }else{
        document.getElementById('singOut').style.display="true";
        if(sesion.rol== 0){
          this.adminV();
          this.credito = 0;
        }else{
          this.userV();
          this.credito = sesion.creditos;
        }
      }
  }

  adminV(){
    document.getElementById('Perfil_U').style.display="none";
    document.getElementById('Categorias_A').style.display="true";
    document.getElementById('Denuncia_A').style.display="true";
    document.getElementById('Reportes_A').style.display="true";
    document.getElementById('newProducto_U').style.display="none";
    document.getElementById('Inicio_U').style.display="none";
    document.getElementById('MyProductos_U').style.display="none";
    document.getElementById('Carrito_U').style.display="none";
    
  }

  userV(){
    document.getElementById('Perfil_U').style.display="true";
    document.getElementById('newProducto_U').style.display="true";
    document.getElementById('Inicio_U').style.display="true";
    document.getElementById('MyProductos_U').style.display="true";
    document.getElementById('Carrito_U').style.display="true";
    document.getElementById('Denuncia_A').style.display="none";
    document.getElementById('Categorias_A').style.display="none";
    document.getElementById('Reportes_A').style.display="none";
  }

  allV(){
    document.getElementById('singOut').style.display="none";
    document.getElementById('Categorias_A').style.display="none";
    document.getElementById('Perfil_U').style.display="none";
    document.getElementById('newProducto_U').style.display="none";
    document.getElementById('Inicio_U').style.display="none";
    document.getElementById('MyProductos_U').style.display="none";
    document.getElementById('Categorias_A').style.display="none";
    document.getElementById('Denuncia_A').style.display="none";
    document.getElementById('Carrito_U').style.display="none";
    document.getElementById('Reportes_A').style.display="none";

  }

  ngOnInit(): void {
    this.visibility();
  }

  SingOut(){
    console.log('Cerro sesion');
    this.userService.limpiarSesion();
    this.router.navigate(['login']);
  }

  Cart(){
    this.router.navigate(['user/cart']);
  }
}
