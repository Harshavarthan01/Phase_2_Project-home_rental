import { Component } from '@angular/core';
import { TempserviceService } from '../Services/tempservice.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PropertyService } from '../Services/property.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css'],
})
export class AddpropertyComponent {
  public registerForm: FormGroup | any;
  frontviewImage: File | null = null;
  sideviewImage: File | null = null;
  interiorviewImage: File | null = null;
  userId: any;
  checkedList: any[];
  showDropDown: boolean = false;
  list = [
    { name: '1-bhk', checked: false },
    { name: '2-bhk', checked: false },
    { name: '3-bhk', checked: false },
  ];
  // currentSelected : {};
  // showmenu:boolean=false;

  myDate = new Date();

  constructor(
    public tempservice: TempserviceService,
    public router: Router,
    private fb: FormBuilder,
    public propertyservice: PropertyService,
    private datePipe: DatePipe
  ) {
    this.checkedList = [];
  }

  ngOnInit() {
    let getdata = JSON.parse(sessionStorage.getItem('userDetails') || '{}');

    this.userId = getdata.userId;

    if (this.tempservice.width <= 430) {
      this.tempservice.showfooter = true;
    }

    this.registerForm = new FormGroup({
      propertyname: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl('', [Validators.required]),
      rent: new FormControl('', [Validators.required]),
      bhk: new FormControl('', [Validators.required]),
      floors: new FormControl('', [Validators.required]),
      furnished: new FormControl('', [Validators.required]),
      // Image: new FormControl('', [Validators.required]),
    });
  }

  onImageSelected(event: any) {
    this.frontviewImage = event.target.files[0] as File;
    // this.upload(15);
  }
  onImage1Selected(event: any) {
    this.sideviewImage = event.target.files[0] as File;
  }
  onImage2Selected(event: any) {
    this.interiorviewImage = event.target.files[0] as File;
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
  upload(data: any) {
    if (this.frontviewImage) {
      var formData = new FormData();
      formData.append('file', this.frontviewImage, this.frontviewImage.name);
      this.propertyservice.uploadImage(formData, 'frontview', data).subscribe(
        (response: any) => {
          console.log('Image uploaded successfully', response);
        },
        (error: any) => {
          console.error('Error uploading image', error);
        }
      );
    }
    if (this.sideviewImage) {
      var formData = new FormData();
      formData.append('file', this.sideviewImage, this.sideviewImage.name);
      this.propertyservice.uploadImage(formData, 'sideview', data).subscribe(
        (response: any) => {
          console.log('Image uploaded successfully', response);
        },
        (error: any) => {
          console.error('Error uploading image', error);
        }
      );
    }
    if (this.interiorviewImage) {
      var formData = new FormData();
      formData.append(
        'file',
        this.interiorviewImage,
        this.interiorviewImage.name
      );
      this.propertyservice.uploadImage(formData, 'interior', data).subscribe(
        (response: any) => {
          console.log('Image uploaded successfully', response);
        },
        (error: any) => {
          console.error('Error uploading image', error);
        }
      );
    }
  }

  submited() {
    if (this.registerForm.invalid) {
      alert(this.registerForm.pincode);
      return;
    }

    let formvalue = {
      propertyName: this.registerForm.get('propertyname').value,
      address: this.registerForm.get('address').value,
      city: this.registerForm.get('city').value,
      pincode: this.registerForm.get('pincode').value,
      description: this.registerForm.get('description').value,
      rentAmount: this.registerForm.get('rent').value,
      numberOfBhk: this.registerForm.get('bhk').value,
      numberOfFloor: this.registerForm.get('floors').value,
      status: 'yes',
      postedDate: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
      furnishedStatus: this.registerForm.get('furnished').value,
      userId: this.userId,
    };

    this.propertyservice.addProperty(formvalue).subscribe((data: any) => {
      console.log(data);
      this.upload(data.propertyId);
    });

    console.log(formvalue);
  }
  Reset() {
    this.registerForm.reset();
    // console.log('hi');
  }
  get propertyname() {
    return this.registerForm.get('propertyname')!;
  }

  get address() {
    return this.registerForm.get('address')!;
  }
  get city() {
    return this.registerForm.get('city')!;
  }

  get pincode() {
    return this.registerForm.get('pincode')!;
  }
  get description() {
    return this.registerForm.get('description')!;
  }

  get rent() {
    return this.registerForm.get('rent')!;
  }
  get bhk() {
    return this.registerForm.get('bhk')!;
  }

  get floors() {
    return this.registerForm.get('floors')!;
  }
  get furnished() {
    return this.registerForm.get('furnished')!;
  }

  // get address() {
  //   return this.registerForm.get('address')!;
  // }
}
