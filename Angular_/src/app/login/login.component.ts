import { Component } from '@angular/core';
import { TempserviceService } from '../Services/tempservice.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  NgForm,
} from '@angular/forms';
import { UserService } from '../Services/user.service';

interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: IUser;
  public loginForm: FormGroup | any;

  public error: boolean = false;

  constructor(
    public tempservice: TempserviceService,
    private fb: FormBuilder,
    public userservice: UserService
  ) {
    this.user = {} as IUser;
  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.user.password, [Validators.required]),
    });
  }
  close() {
    this.tempservice.showlogin = !this.tempservice.showlogin;
  }
  onClickLogin() {
    if (this.loginForm.invalid) {
      console.log('invalid');
    }

    let formvalue = {
      Email: this.loginForm.get('email').value,
      Password: this.loginForm.get('password').value,
    };

    this.userservice.login(formvalue).subscribe(
      (data: any) => {
        console.log(data);
        let userDetails = {
          userId: data.userId,
          userRole: data.userRole,
          userEmail: data.email,
          userName: data.userName,
          phone: data.phone,
        };

        this.tempservice.setData(data);
        console.log(this.tempservice.getData());

        sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
        this.userservice.userRole = userDetails.userRole;
        this.tempservice.showlogin = !this.tempservice.showlogin;
      },
      (err) => {
        this.error = !this.error;
        alert('Invalid Credentials');

        //-----------------------------------------------------------------
      }
    );

    console.log(formvalue);
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  signup() {
    this.tempservice.showlogin = !this.tempservice.showlogin;
    this.tempservice.showregister = !this.tempservice.showregister;
  }
}
