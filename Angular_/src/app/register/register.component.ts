import { Component } from '@angular/core';
import { TempserviceService } from '../Services/tempservice.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../Services/user.service';

interface IUser {
  username: string;
  email: string;
  phone: string;
  password: string;
  userrole: string;
  showPassword: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: IUser;
  public registerForm: FormGroup | any;
  constructor(
    public tempservice: TempserviceService,
    private fb: FormBuilder,
    public userservice: UserService
  ) {
    this.user = {} as IUser;
  }
  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(this.user.phone, [Validators.required]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(14),
      ]),
      userrole: new FormControl(this.user.userrole, [Validators.required]),
    });
  }
  close() {
    this.tempservice.showregister = !this.tempservice.showregister;
  }
  onClickLogin() {
    if (this.registerForm.invalid) {
      console.log('invalid');
    } else {
      let formvalue = {
        userId: 0,
        userName: this.registerForm.get('username').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        phone: this.registerForm.get('phone').value,
        userrole: this.registerForm.get('userrole').value,
      };
      this.userservice.register(formvalue).subscribe((data: any) => {
        alert('Successfully registered');
        this.tempservice.showregister = !this.tempservice.showregister;

        console.log('*****');
      });

      console.log(formvalue);
    }
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get username() {
    return this.registerForm.get('username')!;
  }

  get phone() {
    return this.registerForm.get('phone')!;
  }

  get userRole() {
    return this.registerForm.get('userRole')!;
  }
}
