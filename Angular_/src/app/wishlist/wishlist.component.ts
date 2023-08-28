import { UserService } from './../Services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TempserviceService } from '../Services/tempservice.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
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
  user_Id: any;

  constructor(
    public tempservice: TempserviceService,
    public router: Router,
    public userservice: UserService
  ) {
    this.checkedList = [];
    for (let i = 1; i <= 100; i++) {
      this.checkedList.push(`item ${i}`);
    }
  }

  ngOnInit() {
    // let getdata=JSON.parse(sessionStorage.getItem('userDetails')|| '{}');
    // this.userId=getdata.userId;
    // this.userservice.getUser(userId).subscribe(data:any) => {}
    // this.propertydetails = [
    //   {
    //     title: 'Yogesh villa',
    //     description:
    //       'Some example text some example text. Harsha is an architect and engineer',
    //   },
    //   {
    //     title: 'Harsha villa',
    //     description:
    //       'Some example text some example text. Harsha is an architect and engineer',
    //   },
    //   {
    //     title: 'Ram villa',
    //     description:
    //       'Some example text some example text. Harsha is an architect and engineer',
    //   },
    //   {
    //     title: 'Sanjai villa',
    //     description:
    //       'Some example text some example text. Harsha is an architect and engineer',
    //   },
    //   {
    //     title: 'Jk villa',
    //     description:
    //       'Some example text some example text. Harsha is an architect and engineer',
    //   },
    //   {
    //     title: 'Varun villa',
    //     description:
    //       'Some example text some example text. Harsha is an architect and engineer',
    //   },
    // ];

    let userid = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    this.user_Id = userid.userId;

    this.userservice.getWishlist(this.user_Id).subscribe(
      (data: any) => {
        this.propertydetails = data;
      },
      (err: any) => {
        console.log(err);
      }
    );

    if (this.tempservice.width <= 430) {
      this.tempservice.showfooter = true;
    }
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

  clickproperty() {
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
  removeproperty(propertyid: any) {
    this.userservice.removeWishlist(this.user_Id, propertyid).subscribe(
      (data: any) => {
        console.log('removed');
        this.ngOnInit();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  Openlogin() {
    this.tempservice.showlogin = !this.tempservice.showlogin;
  }
  Openregister() {
    this.tempservice.showregister = !this.tempservice.showregister;
  }
}
