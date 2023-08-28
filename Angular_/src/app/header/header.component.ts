import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TempserviceService } from '../Services/tempservice.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  listBhk = [
    { name: '1-bhk', checked: false },
    { name: '2-bhk', checked: false },
    { name: '3-bhk', checked: false },
  ];
  bhkFilterSelected: any[] = [];
  showDropDown1: boolean = false;

  constructor(
    public tempservice: TempserviceService,
    public router: Router,
    public userservice: UserService
  ) {}

  menuclick() {
    this.tempservice.showmenu = !this.tempservice.showmenu;
  }
  Openlogin() {
    this.tempservice.showlogin = !this.tempservice.showlogin;
  }
  Openregister() {
    this.tempservice.showregister = !this.tempservice.showregister;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

  bhkSelectedValue(status: Boolean, value: String) {
    if (status) {
      this.bhkFilterSelected.push(value);
    } else {
      var index = this.bhkFilterSelected.indexOf(value);
      this.bhkFilterSelected.splice(index, 1);
    }
    console.log(this.bhkFilterSelected);
    // this.currentSelected = {checked : status,name:value};
  }
}
