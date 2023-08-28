import { Component } from '@angular/core';
import { TempserviceService } from '../Services/tempservice.service';
import { UserService } from '../Services/user.service';
import { PropertyService } from '../Services/property.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})
export class PropertyComponent {
  serachlist: any;
  constructor(
    public tempservice: TempserviceService,
    public userservice: UserService,
    public propertyservice: PropertyService,
    public router: Router
  ) {}

  propertydetails: any;
  user_Id: any;
  propertyDescription: string = '';

  ngOnInit() {
    let userid = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    this.user_Id = userid.userId;

    let propertyId = JSON.parse(sessionStorage.getItem('PropertyId') || '{}');
    // console.log(propertyData.propertyId);

    this.propertyservice.selectedPropertyDisplay(propertyId).subscribe(
      (data: any) => {
        this.propertydetails = data;
        this.serachlist = this.propertydetails;
        this.propertyservice.selectedPropertyDetails = data;
        console.log(data);
        this.router.navigate(['/property']);
      },
      (err) => {
        alert('Property not found');
      }
    );
  }

  menuclick() {
    this.tempservice.showmenu = !this.tempservice.showmenu;
  }

  addwishlist(property_Id: any) {
    let wishlistdata = {
      propertyId: property_Id,
      userId: this.user_Id,
    };
    if (!this.userservice.isloggedIn()) {
      alert('please login to add wishlist');
    } else {
      this.userservice.addWishlist(wishlistdata).subscribe(
        (data: any) => {
          console.log(data);
          alert('Wishlist added successfully');
        },
        (err: any) => {
          console.log(err);
          alert('Wishlist added successfully');
        }
      );
    }
  }
}
