import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

   id:string;
   pass:string;
   contra:string;

  constructor(private active:ActivatedRoute, private usersService: UserService, private router: Router) { }

  ngOnInit() {
    const param = this.active.snapshot.params;
    this.id= param.id;
  }

  validateData(){
    console.log(this.id);
    console.log(this.contra);
    if(this.contra == this.pass){

      let usr={
        id: this.id,
        contra: this.contra,
      }

      this.usersService.restartPass2(usr).subscribe(
        res=>{
          console.log(res);
          var temp:any = res;
          alert(temp.text);
          this.router.navigate(['login']);
        },
        err=>console.log(err)
      );

    }else{
      alert("Las contraseñas no coinciden")
    }
  }
}
