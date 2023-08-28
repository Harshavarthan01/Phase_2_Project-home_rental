import { Component } from '@angular/core';
import { TempserviceService } from '../Services/tempservice.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-togglemenu',
  templateUrl: './togglemenu.component.html',
  styleUrls: ['./togglemenu.component.css'],
})
export class TogglemenuComponent {
  togglemenu: boolean = true;
  constructor(
    public tempservice: TempserviceService,
    public userservice: UserService
  ) {}
  ngOnInIt() {}

  close() {
    // this.togglemenu=false;
    // setTimeout(() =>{
    //   this.tempservice.showmenu=!this.tempservice.showmenu;
    //   this.togglemenu=true;
    // },4000);
    this.tempservice.showmenu = !this.tempservice.showmenu;
  }

  login() {
    this.tempservice.showlogin = !this.tempservice.showlogin;
  }

  logout() {
    sessionStorage.clear();
  }
}
