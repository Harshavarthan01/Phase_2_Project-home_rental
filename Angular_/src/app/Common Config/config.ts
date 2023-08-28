import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Config {
  // public Login_url = `${this.Base_url}/Home/Login`;

  public Base_url = 'https://localhost:7293/api';

  public allProperty_url = `${this.Base_url}/Property/GetAllProperties`;
  public selectedProperty_url = `${this.Base_url}/Property/PropertyDetails`;
  public addProperty_url = `${this.Base_url}/Property/AddProperty`;
  public addImage_url = `${this.Base_url}/Property/UploadImage`;
  public deleteproperty_url = `${this.Base_url}/Property/RemoveProperty`;

  public login_url = `${this.Base_url}/User/Userlogin`;
  public register_url = `${this.Base_url}/User/UserRegister`;
  public getUserr_url = `${this.Base_url}/User/GetUser`;
  public updateUserr_url = `${this.Base_url}/User/UpdateUser`;
  public mypropertyUserr_url = `${this.Base_url}/User/GetMyproperties`;
  public getWishlist_url = `${this.Base_url}/User/GetWishlist`;
  public addWishlist_url = `${this.Base_url}/User/AddWishlist`;
  public removeWishlist_url = `${this.Base_url}/User/RemoveWishlist`;
  public userRole_url = `${this.Base_url}/User/ChangeUserRole`;

  public updateUserDetails_url = `${this.Base_url}/User/UpdateUserDetails`;
}
