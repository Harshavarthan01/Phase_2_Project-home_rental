import { Component } from '@angular/core';
import { TempserviceService } from '../tempservice.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(public tempservice:TempserviceService){}

}
