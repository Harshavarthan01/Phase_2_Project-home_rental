import { Injectable } from '@angular/core';
import { Config } from '../Common Config/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userRole: any;

  constructor(public config: Config, private http: HttpClient) {}

  isloggedIn() {
    return sessionStorage.getItem('userDetails') ? true : false;
  }

  login(data: any) {
    return this.http.post(this.config.login_url, data);
  }

  register(data: any) {
    return this.http.post(this.config.register_url, data);
  }

  getUser(data: any) {
    const httpOptions: Object = {
      params: {
        userId: data,
      },
    };
    return this.http.get(this.config.getUserr_url, httpOptions);
  }

  updateUserDetails(data: any) {
    return this.http.put(this.config.updateUserDetails_url, data);
  }

  modifyUserDetails(data: any) {
    return this.http.put(this.config.updateUserDetails_url, data);
  }

  myProperty(data: any) {
    const httpOptions: Object = {
      params: {
        userId: data,
      },
    };

    return this.http.get(this.config.mypropertyUserr_url, httpOptions);
  }

  addWishlist(data: any) {
    return this.http.post(this.config.addWishlist_url, data);
  }

  getWishlist(data: any) {
    const httpOptions: Object = {
      params: {
        userId: data,
      },
    };
    return this.http.get(this.config.getWishlist_url, httpOptions);
  }

  removeWishlist(data1: any, data2: any) {
    const httpOptions: Object = {
      responseType: 'text',
      params: {
        userId: data1,
        propertyId: data2,
      },
    };
    return this.http.delete(this.config.removeWishlist_url, httpOptions);
  }

  changeUserRole(data: number) {
    const httpOptions: Object = {
      params: {
        userId: data,
      },
    };
    return this.http.put(this.config.userRole_url, httpOptions);
  }
}
