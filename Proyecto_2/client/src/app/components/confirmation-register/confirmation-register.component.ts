import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-confirmation-register',
  templateUrl: './confirmation-register.component.html',
  styleUrls: ['./confirmation-register.component.css']
})
export class ConfirmationRegisterComponent implements OnInit {

  constructor(private active:ActivatedRoute, private usersService: UserService, private router: Router) { }

  ngOnInit() {
    const param = this.active.snapshot.params;
    var id:string = param.id;
    this.usersService.verifyUsr(id).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

}
