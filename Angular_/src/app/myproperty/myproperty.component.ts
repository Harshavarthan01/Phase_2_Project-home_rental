import { Component } from '@angular/core';
import { TempserviceService } from '../Services/tempservice.service';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { PropertyService } from '../Services/property.service';

@Component({
  selector: 'app-myproperty',
  templateUrl: './myproperty.component.html',
  styleUrls: ['./myproperty.component.css'],
})
export class MypropertyComponent {
  propertydetails: any = [];
  checkedList: any[];
  showDropDown: boolean = false;
  list = [
    { name: '1-bhk', checked: false },
    { name: '2-bhk', checked: false },
    { name: '3-bhk', checked: false },
  ];
  // currentSelected : {};
  // showmenu:boolean=false;
  public start: any;
  public last: any;
  public page: number = 0;
  userId: any;

  constructor(
    public tempservice: TempserviceService,
    public router: Router,
    public userservice: UserService,
    public propertyservice: PropertyService
  ) {
    this.checkedList = [];
    for (let i = 1; i <= 100; i++) {
      this.checkedList.push(`item ${i}`);
    }
  }

  ngOnInit() {
    let getdata = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    this.userId = getdata.userId;
    this.userProperties();

    if (this.tempservice.width <= 430) {
      this.tempservice.showfooter = true;
    }
  }

  userProperties() {
    this.userservice.myProperty(this.userId).subscribe(
      (data: any) => {
        console.log(data);

        this.propertydetails = data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  listCount(count: number) {
    this.start = count;
    this.start = this.start * 10 - 9;
    this.last = count * 10;
    if (this.last > this.checkedList.length) {
      this.last = this.checkedList.length;
    }
    console.log(
      'start' + '      ' + this.start + '      ' + 'last' + '      ' + this.last
    );
  }

  menuclick() {
    this.tempservice.showmenu = !this.tempservice.showmenu;
  }

  clickproperty(items: any) {
    sessionStorage.setItem('PropertyId', JSON.stringify(items.propertyId));
    this.router.navigate(['/property']);
  }
  getSelectedValue(status: Boolean, value: String) {
    if (status) {
      this.checkedList.push(value);
    } else {
      var index = this.checkedList.indexOf(value);
      this.checkedList.splice(index, 1);
    }

    // this.currentSelected = {checked : status,name:value};
  }

  Openlogin() {
    this.tempservice.showlogin = !this.tempservice.showlogin;
  }
  Openregister() {
    this.tempservice.showregister = !this.tempservice.showregister;
  }

  Removeproperty(data: any) {
    this.propertyservice.deleteproperty(data).subscribe((data: any) => {
      this.userProperties();
    });
  }
}
