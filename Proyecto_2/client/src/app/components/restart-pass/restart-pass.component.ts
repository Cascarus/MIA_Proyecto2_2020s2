import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service'


@Component({
  selector: 'app-restart-pass',
  templateUrl: './restart-pass.component.html',
  styleUrls: ['./restart-pass.component.css']
})
export class RestartPassComponent implements OnInit {

  temp = {
    Correo: ''
  }

  constructor(private usersService: UserService, private router: Router) { }

  ngOnInit() {
  }

  resetPassword(){
    console.log("temporal lleva");
    console.log(this.temp);
    this.usersService.restartPass1(this.temp).subscribe(
      res=>{
        console.log(res);
        alert('Revise su correo por favor');
      },
      err=>console.log(err)
    );
  }

}
