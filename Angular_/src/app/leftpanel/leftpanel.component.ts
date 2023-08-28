import { Component } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.css']
})
export class LeftpanelComponent {

  constructor(public userservice:UserService){}

  ngOnInit(){

    let userdetails=JSON.parse(sessionStorage.getItem('userDetails')|| '{}');
    this.userservice.userRole=userdetails.userRole;
  }

  logout(){
    sessionStorage.clear();
  }

}
