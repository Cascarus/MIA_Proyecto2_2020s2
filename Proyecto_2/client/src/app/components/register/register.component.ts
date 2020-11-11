import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service'
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  imgDef: string = "assets/img/Defecto.png";

  user: User = {
    Cod_usuario: 0,
    Nombre: '',
    Apellido: '',
    Correo: '',
    Cod_Pais: 0,
    Fecha: new Date(),
    Tipo: 1,
    Contrasena: '',
    Foto: null,
    Creditos: 10000,
    Validacion: 0
  };

  temp: any;
  pass: string;
  pais: string;
  paises: any = [];
  foto_file: File; 

  constructor(private usersService:UserService, private imageService:ImageService, private router: Router) { }

  ngOnInit() :void{
    this.getPaises();
  }

  getPaises(){
    this.usersService.getPaises().subscribe(
      res =>{
      this.paises = res;
      console.log(this.paises);
      },
      err => console.log(err)
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
    delete this.user.Cod_usuario;
    this.user.Cod_Pais = parseInt(this.pais, 10);

    if(this.user.Contrasena == this.pass){
      if(this.foto_file != null){
        this.imageService.create(this.foto_file).subscribe(
          res => {console.log(res);
            var tempI:any=res; 
          
            this.user.Foto=tempI.text;
            this.createUsr();
          },
          err => console.log(err)
        );
      }else{
        this.user.Foto = this.imgDef;
        this.createUsr();
      }

      console.log(this.user);

    }else{
      alert("Las contraseñas no coinciden")
    }
  }

  createUsr(){
    console.log(this.user);

    this.usersService.createUser(this.user).subscribe(
      res => {
        console.log(res);
        var temp:any = res;

        if(temp.text == "true"){
          this.user.Cod_usuario = temp.id

          this.usersService.sendCorreo(this.user).subscribe(
            res => {
              console.log(res)
              var temp2:any = res;

              if(temp2.text == "enviado"){
                alert("Usuario creado, por favor verifique su correo para validar su cuenta")
                this.router.navigate(['login']);
              }
            },
            err => console.log(err)
          );
          console.log(this.user)

        }else{
          alert("El correo ya esta registrado");
        }
      },
      err => console.error(err)
    );
  }

  regresar(){
    this.router.navigate(['login']);
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
