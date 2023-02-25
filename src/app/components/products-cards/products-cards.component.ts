import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from 'src/app/data/global-data.service';
import { _Product } from 'src/app/models/Product.model';

@Component({
  selector: 'products',
  templateUrl: './products-cards.component.html',
  styleUrls: ['./products-cards.component.css']
})
export class ProductsCards implements OnInit {
  products: Array<_Product>;

  constructor(private globalDataService: GlobalDataService) {
    this.products = [];
  }

  ngOnInit() {
    this.products = this.globalDataService.getProducts();
  }
  
}
