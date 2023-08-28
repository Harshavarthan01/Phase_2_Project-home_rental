import { Component } from '@angular/core';
import { TempserviceService } from '../Services/tempservice.service';
import { Router } from '@angular/router';
import { PropertyService } from '../Services/property.service';
import { UserService } from '../Services/user.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

interface IUser {
  username: string;
  email: string;
  phone: string;
  password: string;
  showPassword: boolean;
}

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent {
  user: IUser;
  public userdetails: any;
  userId: any;
  access: boolean = true;
  public modifyForm: FormGroup | any;
  constructor(
    public tempservice: TempserviceService,
    private fb: FormBuilder,
    public userservice: UserService
  ) {
    this.user = {} as IUser;
  }
  ngOnInit() {
    const getdata = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    this.userdetails = getdata;

    this.modifyForm = new FormGroup({
      username: new FormControl(this.userdetails.userName, [
        Validators.required,
      ]),
      email: new FormControl(this.userdetails.userEmail, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(this.userdetails.phone, [Validators.required]),
      password: new FormControl(this.userdetails.userRole, [
        Validators.required,
      ]),
    });
  }
  modify() {
    this.access = !this.access;
  }

  close() {
    this.tempservice.showregister = !this.tempservice.showregister;
  }
  onClickLogin() {
    if (this.modifyForm.invalid) {
      console.log('invalid');
    } else {
      alert('valid');
      let formvalue = {
        userId: this.userdetails.userId,
        userName: this.modifyForm.get('username').value,
        email: this.modifyForm.get('email').value,

        phone: this.modifyForm.get('phone').value,
      };

      this.userservice.updateUserDetails(formvalue).subscribe((data: any) => {
        console.log(data);
      });

      console.log(formvalue);
    }
  }

  get email() {
    return this.modifyForm.get('email')!;
  }

  get password() {
    return this.modifyForm.get('password')!;
  }

  get username() {
    return this.modifyForm.get('username')!;
  }

  get phone() {
    return this.modifyForm.get('phone')!;
  }

  showlogin() {
    this.tempservice.showlogin = !this.tempservice.showlogin;
  }
}
