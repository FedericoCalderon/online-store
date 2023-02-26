import { Component } from '@angular/core';
import { GlobalDataService } from 'src/app/data/global-data.service';

@Component({
  selector: 'btn-gotop',
  templateUrl: './btn-gotop.component.html',
  styleUrls: ['./btn-gotop.component.css']
})
export class BtnGotopComponent {
  
  constructor (private globalDataService: GlobalDataService) {}

  goTop() {
    document.documentElement.scrollTop = 0;
  }
}
