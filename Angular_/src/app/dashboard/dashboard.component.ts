import { Component, OnInit } from '@angular/core';
import { TempserviceService } from '../Services/tempservice.service';
import { RouterModule, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../Services/user.service';
import { PropertyService } from '../Services/property.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  propertydetails: any = [];
  bhkFilterSelected: any[];
  furnishedFilterSelected: any[];
  showDropDown1: boolean = false;
  showDropDown2: boolean = false;
  listBhk = [
    { name: '1-bhk', checked: false },
    { name: '2-bhk', checked: false },
    { name: '3-bhk', checked: false },
  ];
  listFurnshed = [
    { name: 'Furnished', checked: false },
    { name: 'Semi-Furnished', checked: false },
    { name: 'Not Furnished', checked: false },
  ];
  // currentSelected : {};
  // showmenu:boolean=false;

  constructor(
    public tempservice: TempserviceService,
    public router: Router,
    public userservice: UserService,
    public propertyservice: PropertyService
  ) {
    this.bhkFilterSelected = [];
    this.furnishedFilterSelected = [];
  }

  ngOnInit() {
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
    this.serachlist = this.propertydetails;

    if (this.tempservice.width <= 430) {
      this.tempservice.showfooter = true;
    }

    this.propertyservice.allPropertyDisplay().subscribe(
      (data: any) => {
        this.propertydetails = data;
        this.serachlist = this.propertydetails;
        console.log(data.data);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  menuclick() {
    this.tempservice.showmenu = !this.tempservice.showmenu;
  }

  clickproperty(items: any) {
    // this.propertyservice.selectedPropertyDetails=items;
    sessionStorage.setItem('PropertyId', JSON.stringify(items.propertyId));
    this.router.navigate(['/property']);

    // this.propertyservice.selectedPropertyDisplay(items.propertyId).subscribe(
    //   (data: any) => {
    //     this.propertydetails = data;
    //     this.serachlist = this.propertydetails;
    //     this.propertyservice.selectedPropertyDetails = data;
    //     console.log(data);
    //     this.router.navigate(['/property']);
    //   },
    //   (err) => {
    //     alert('Property not found');
    //   }
    // );
  }
  getSelectedValue(status: Boolean, value: String) {
    if (status) {
      this.bhkFilterSelected.push(value);
    } else {
      var index = this.bhkFilterSelected.indexOf(value);
      this.bhkFilterSelected.splice(index, 1);
    }
    console.log(this.bhkFilterSelected);
    // this.currentSelected = {checked : status,name:value};
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
  furnishedSelectedValue(status: Boolean, value: String) {
    if (status) {
      this.furnishedFilterSelected.push(value);
    } else {
      var index = this.furnishedFilterSelected.indexOf(value);
      this.furnishedFilterSelected.splice(index, 1);
    }
    console.log(this.furnishedFilterSelected);
    // this.currentSelected = {checked : status,name:value};
  }

  Openlogin() {
    this.tempservice.showlogin = !this.tempservice.showlogin;
  }
  Openregister() {
    this.tempservice.showregister = !this.tempservice.showregister;
  }

  becomeOwner() {
    this.tempservice.ownerpopup = !this.tempservice.ownerpopup;
  }

  serachlist: any = [];
  searchtext = '';
  searchValue: any;
  Search() {
    this.propertydetails = this.serachlist;
    if (this.searchtext !== '') {
      this.searchValue = this.searchtext.toLocaleLowerCase();

      this.propertydetails = this.propertydetails.filter(
        (property: { rentAmount: any; propertyName: string; city: string }) => {
          return (
            property.propertyName.toLocaleLowerCase().match(this.searchValue) ||
            property.city.toLocaleLowerCase().match(this.searchValue) ||
            property.rentAmount.toString().match(this.searchValue)
          );
          // || property.location.toLocaleLowerCase().match(this.searchValue)

          // you can keep on adding object properties here
        }
      );
    } else {
      // if(this.searchText== ""){ you don't need this if
      this.propertydetails = this.serachlist;
    }
  }
}
