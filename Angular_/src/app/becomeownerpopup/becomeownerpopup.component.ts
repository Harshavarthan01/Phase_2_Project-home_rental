import { Component } from '@angular/core';
import { TempserviceService } from '../Services/tempservice.service';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-becomeownerpopup',
  templateUrl: './becomeownerpopup.component.html',
  styleUrls: ['./becomeownerpopup.component.css'],
})
export class BecomeownerpopupComponent {
  user_Id: any;

  constructor(
    public tempservice: TempserviceService,
    public router: Router,
    public userservice: UserService
  ) {}

  ngOnInit() {
    let userid = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    this.user_Id = userid.userId;
  }

  Close() {
    this.tempservice.ownerpopup = false;
  }
  cancelowner() {
    this.tempservice.ownerpopup = false;
    this.tempservice.ownerconfirmation = false;
  }

  confirmowner() {
    this.tempservice.ownerpopup = false;
    this.tempservice.ownerconfirmation = true;

    this.userservice.changeUserRole(this.user_Id).subscribe(
      (data: any) => {
        console.log(data);
      },
      (err: any) => {
        console.log(err);
      }
    );

    // this.rightpanelcmp.owner();
  }
}
