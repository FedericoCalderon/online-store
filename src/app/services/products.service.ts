import { Injectable } from "@angular/core";
import { _Product } from "../models/Product.model";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToastTypeMessage } from "../constants/toast-type.enum";
import { ToastService } from "./toast.service";
import { ValidationsService } from "./validations.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { IProduct } from "../interfaces/IProducts";


@Injectable({providedIn: 'root'})

export class ProductsService {
    private products: Array<_Product> = [];
    private refreshSource = new BehaviorSubject(new _Product("",0,"","","",-1));
    public refresh$: Observable<_Product>;

    constructor (private toastService: ToastService, private validationsService: ValidationsService, private http: HttpClient) {
        
        
        this.refresh$ = this.refreshSource.asObservable();
        this.loadProdcuts();
    }

    
    public loadProdcuts(): void {
        this.http.get(environment.dataUrl)
        .subscribe((productsResponse: any ) => {
            productsResponse.map((product: IProduct) => {
                this.products.push(new _Product(product.title, product.price, product.description, product.imageName, product.imageUrl))
            })
        })
    }

    public getProducts(): Array<_Product> {
        return this.products;
    }

    public insertProduct(
        title: string,
        price: number,
        description: string,
        imageName: string,
        imageUrl: string,
        id: number | null,
        ): void {
        this.validationsService.validateTitle(title);
        this.validationsService.validatePrice(price);
        this.validationsService.validateDescription(description);
        if (id) {
            const productIndex: number = this.findIndexOfProduct(id);
            if (productIndex == -1) {
                this.products.unshift(new _Product(title, price, description, imageName, imageUrl));
                this.toastService.showAlert("Producto Agregado con exito!", 1500, ToastTypeMessage.success)
            }
            this.products[productIndex].title = title;
            this.products[productIndex].price = price;
            this.products[productIndex].description = description;
            this.products[productIndex].image.url = imageUrl;
            this.products[productIndex].image.name = imageName;
            this.toastService.showAlert("Producto Editado con exito!", 1500, ToastTypeMessage.informative)
            this.resetProduct();
            return;
        }
        this.products.unshift(new _Product(title, price, description, imageName, imageUrl));
        this.toastService.showAlert("Producto Agregado con exito!", 1500, ToastTypeMessage.success)
    }

    public removeProduct(id: number): void {
        this.products = this.products.filter((product ) => product.id != id);
        this.toastService.showAlert("Producto Eliminado con exito!", 1500, ToastTypeMessage.danger)
    }

    public editProduct(id: number) {
        const product: _Product = this.products[this.findIndexOfProduct(id)];
        if (!product.title || !product.price || !product.description || !product.id) {
            throw new Error(`Prodcut dont has properies \n${product}`);
        }
        this.refreshSource.next(product);
    }

    private findIndexOfProduct(id: number):number {
        let index: number = -1;
        this.products.forEach((product: _Product, i: number): void => {
            if (product.id == id) {
                index = i;
            }
        })
        return index;

    }
    
    public resetProduct():void {
        this.refreshSource.next(new _Product("",-1,"","","",-1));
    }

    public goTop():void {
        document.documentElement.scrollTop = 0;
    }
}