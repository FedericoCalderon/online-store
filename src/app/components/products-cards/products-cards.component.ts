import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { _Product } from 'src/app/models/Product.model';

@Component({
  selector: 'products',
  templateUrl: './products-cards.component.html',
  styleUrls: ['./products-cards.component.css']
})
export class ProductsCards implements OnInit {
  products: Array<_Product>;

  constructor(private productService: ProductsService) {
    this.products = [];
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }
  
}
