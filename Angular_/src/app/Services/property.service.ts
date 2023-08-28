import { Injectable } from '@angular/core';
import { Config } from '../Common Config/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  selectedPropertyDetails: any;
  public formdata: FormData = new FormData();

  constructor(public config: Config, private http: HttpClient) {}

  allPropertyDisplay() {
    return this.http.get(this.config.allProperty_url);
  }

  selectedPropertyDisplay(data: any) {
    const httpOptions: Object = {
      params: {
        propertyId: data,
      },
    };

    return this.http.get(this.config.selectedProperty_url, httpOptions);
  }

  addProperty(data: any) {
    return this.http.post(this.config.addProperty_url, data);
  }

  uploadImage(formdata: any, data1: any, data2: any) {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Disposition': 'multipart/form-data',
      }),
      responseType: 'application/octet-stream',
      params: { imgType: data1, propertyId: data2 },
      observe: 'response',
    };
    return this.http.post(this.config.addImage_url, formdata, httpOptions);
  }

  deleteproperty(data: any) {
    const httpOptions: Object = {
      params: {
        propertyId: data,
      },
    };

    return this.http.delete(this.config.deleteproperty_url, httpOptions);
  }
}
