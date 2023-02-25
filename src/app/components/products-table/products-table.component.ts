import { Component } from '@angular/core';
import { GlobalConstants } from 'src/app/constants/global-constants';
import { GlobalDataService } from 'src/app/data/global-data.service';
import { _Product } from 'src/app/models/Product.model';

@Component({
  selector: 'products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})

export class ProductsTableComponent {

  public propId: string;
  public propTitle: string;
  public propDescription: string;
  public propImage: string;
  public propPrice: string;
  public propSettings: string;

  constructor(private globalDataService: GlobalDataService) {
    this.propId = GlobalConstants.props.id;
    this.propTitle = GlobalConstants.props.title;
    this.propDescription = GlobalConstants.props.description;
    this.propImage = GlobalConstants.props.image;
    this.propPrice = GlobalConstants.props.price;
    this.propSettings = GlobalConstants.props.settings;
  }

  public getProducts(): Array<_Product> {
    return this.globalDataService.getProducts();
  }

  public onRemove(id: number): void {
    this.globalDataService.removeProduct(id);
  }
  
  public onEdit(id: number) {
    this.globalDataService.editProduct(id);
    this.globalDataService.goTop();
  }

}