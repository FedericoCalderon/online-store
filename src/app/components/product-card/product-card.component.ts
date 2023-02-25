import { Component, Input } from '@angular/core';
import { _Product } from '../../models/Product.model';
import { GlobalConstants } from 'src/app/constants/global-constants';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})

export class ProductCard {
    @Input('title')
        title: string;
    @Input('price')
        price: number;
    @Input('description')
        description: string;
    @Input('imageName')
        imageName: string;
    @Input('imageUrl')
        imageUrl: string;

    public propPrice: string;
    public propDescription: string;

    constructor () {
        this.title = "";
        this.price = 0;
        this.description = "";
        this.imageName = "";
        this.imageUrl = "";
        
        this.propDescription = GlobalConstants.props.description;
        this.propPrice = GlobalConstants.props.price;
    }
}
