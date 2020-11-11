import { Component, OnInit, HostBinding } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service'
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private usersService: UserService, private adminService: AdminService, private router: Router) { }

  idOrderBY:any='';
  precios:any=[{id:'DESC',texto:'Descendente'},{id:'ASC',texto:'Ascendente'}];
  
  repo1:any=[];
  repo2:any=[];
  repo3:any=[];
  repo4:any=[];
  repo5a:any=[];
  repo5b:any=[];
  repo6:any=[];
  repo7:any=[];
  repo8:any=[];

  ngOnInit(): void {
    this.reporteOne();  
  }

  reporteOne(){
    this.getReporte1();
    this.getReporte2();
    this.getReporte3();
    this.getReporte4();
    this.getReporte5a();
    this.getReporte5b();
    this.getReporte6();
    this.getReporte7();
    this.getReporte8();
  }

  
  OrdenarBitacora(){
    this.adminService.getRep1_(this.idOrderBY).subscribe(
      res=>{ this.repo1=res;console.log(res);},
      err=> console.log(err)
      
    );
  }

  getReporte1(){
    this.adminService.getRep1().subscribe(
      res=>{this.repo1=res;console.log(res);
      },
      err=>console.log(err)
    );
  }

  getReporte2(){
    this.adminService.getRep2().subscribe(
      res=>{console.log(res); this.repo2=res;
      },
      err=>{console.log(err);
      }
    );
  }

  getReporte3(){
    this.adminService.getRep3().subscribe(
      res=>{console.log(res); this.repo3=res;
      },
      err=>{console.log(err);
      }
    );
  }

  getReporte4(){
    this.adminService.getRep4().subscribe(
      res=>{console.log(res); this.repo4=res;
      },
      err=>{console.log(err);
      }
    );
  }

  getReporte5a(){
    this.adminService.getRep5a().subscribe(
      res=>{console.log(res); this.repo5a=res;
      },
      err=>{console.log(err);
      }
    );
  }

  getReporte5b(){
    this.adminService.getRep5b().subscribe(
      res=>{console.log(res); this.repo5b=res;
      },
      err=>{console.log(err);
      }
    );
  }

  getReporte6(){
    this.adminService.getRep6().subscribe(
      res=>{console.log(res); this.repo6=res;
      },
      err=>{console.log(err);
      }
    );
  }

  getReporte7(){
    this.adminService.getRep7().subscribe(
      res=>{
        console.log('report 7');
        console.log(res);
        this.repo7=res;

      },
      err=>{console.log(err);
      }
    );
  }

  getReporte8(){
    this.adminService.getRep8().subscribe(
      res=>{console.log(res); this.repo8=res;

      },
      err=>{console.log(err);
      }
    );
  }

}
