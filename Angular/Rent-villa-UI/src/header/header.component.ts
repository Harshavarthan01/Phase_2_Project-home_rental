import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TempserviceService } from '../tempservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public tempservice: TempserviceService,public router:Router) {
   
  }

  menuclick() {
    this.tempservice.showmenu = !this.tempservice.showmenu;
  }
  Openlogin(){
    this.tempservice.showlogin=!this.tempservice.showlogin;
  }
  Openregister(){
    this.tempservice.showregister=!this.tempservice.showregister;
  }
}
