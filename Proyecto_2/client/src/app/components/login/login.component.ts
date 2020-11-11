import { Component, OnInit, HostBinding } from '@angular/core';

import { UserService } from '../../services/user.service'
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  imgDef: string = "img01.png"

  //@HostBinding('class') classes = 'row';

  user: User = {
    Cod_usuario: 0,
    Nombre: '',
    Apellido: '',
    Correo: '',
    Cod_Pais: 0,
    Fecha: new Date(),
    Tipo: 1,
    Contrasena: '',
    Creditos: 1000,
    Validacion: 0
  };

  temp: any;

  constructor(private usersService: UserService, private router: Router) { 
    localStorage.removeItem("currentUsr");
  }

  ngOnInit(): void {
  }

  loginNow(){
    delete this.user.Cod_usuario;
    delete this.user.Nombre;
    delete this.user.Apellido;
    delete this.user.Cod_Pais;
    delete this.user.Fecha;
    delete this.user.Tipo;
    delete this.user.Creditos;
    delete this.user.Validacion;

    console.log(this.user);
    this.usersService.login(this.user).subscribe(
        res => {
          this.temp = res;
          console.log("respuesta")
          console.log(this.temp);

          if(this.temp.text == 'false'){
            alert('El correo o la contrasena son incorrectos');
            return;
          }

          delete this.temp.text;

          let user_string = JSON.stringify(res);
          console.log(user_string);
          localStorage.setItem('currentUsr',user_string);
          this.addBitacora("El usuario " + this.usersService.getSesion().id + " ha iniciado sesion")

          if(this.temp.tipo == 0){//login admin
            console.log("entro a if del 0");
            this.router.navigate(['admin']);
          }else{ // usuario normal
            if (this.temp.validacion == 1){
              alert('el usuario esta verificado');
              this.router.navigate(['home']);

            } else {
              alert('el usuario no esta verificado');
            }
          }

        },
        err => console.error(err)
      );

  }

  addBitacora(des: string){
    var bit ={
      id: this.usersService.getSesion().id,
      descripcion: des,
      fecha: new Date().getFullYear() + '/' +  new Date().getMonth() + '/' + new Date().getDate(),
    }
    this.usersService.addBitacora(bit).subscribe(
      res=>{console.log(res);
      },
      err=>console.log(err)
    );
  }

}
