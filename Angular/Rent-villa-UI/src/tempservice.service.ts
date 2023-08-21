import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TempserviceService {
  constructor() {}

  showmenu: boolean = false;
  width = window.innerWidth;
  showfooter: boolean = false;
  showlogin: boolean = false;
  showregister: boolean = false;
  becomeOwnerPopup: boolean = false;
  ownerpopup:boolean=false;
  ownerconfirmation:boolean=false;
}
