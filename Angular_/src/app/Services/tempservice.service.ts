import { Injectable } from '@angular/core';
import { Config } from '../Common Config/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TempserviceService {
  constructor(public config: Config, private http: HttpClient) {}
  private sharedData: Subject<any> = new Subject<any>();
  sharedData$: Observable<any> = this.sharedData.asObservable();
  userdetails: any = '';

  showmenu: boolean = false;
  width = window.innerWidth;
  showfooter: boolean = false;
  showlogin: boolean = false;
  showregister: boolean = false;
  becomeOwnerPopup: boolean = false;
  ownerpopup: boolean = false;
  ownerconfirmation: boolean = false;

  setData(data: any) {
    this.userdetails = data;
  }

  getData() {
    return this.userdetails;
  }
}
