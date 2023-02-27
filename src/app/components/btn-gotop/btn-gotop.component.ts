import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'btn-gotop',
  templateUrl: './btn-gotop.component.html',
  styleUrls: ['./btn-gotop.component.css']
})
export class BtnGotopComponent {
  
  constructor (private plobalDataService: ProductsService) {}

  goTop() {
    this.plobalDataService.goTop()
  }
}
