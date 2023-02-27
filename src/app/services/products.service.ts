import { Injectable } from "@angular/core";
import { GlobalConstants } from "../constants/global-constants";
import { _Product } from "../models/Product.model";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToastTypeMessage } from "../constants/toast-type.enum";
import { ToastService } from "./toast.service";
import { ValidationsService } from "./validations.service";


@Injectable({providedIn: 'root'})

export class ProductsService {
    private products: Array<_Product> = [];
    // public product: _Product | null;
    // public refresh$: Subject<_Product>;
    private refreshSource = new BehaviorSubject(new _Product("",0,"","","",-1));
    public refresh$: Observable<_Product>;

    constructor (private toastService: ToastService, private validationsService: ValidationsService) {
        const exampleProducts = [
            new _Product("Zapatillas urbanas", 15800, "Zapatillas blancas urbanas con detalle de corazón, femeninas ",'1.jpg', GlobalConstants.images[0]),
            new _Product("Conjunto de invierno masculino", 21000, "Conjunto campera + pantalón de pólar, color rojo con negro ",'2.jpg', GlobalConstants.images[1]),
            new _Product("Camiseta femenina", 5000, "Camiseta con tiras, femenina para verano",'3.jpg', GlobalConstants.images[2]),
            new _Product("Camiseta térmica", 8900, "Camiseta térmica de mangas largas estilo invernal, 100% aglgodón, color gris claro",'4.jpg', GlobalConstants.images[3]),
            new _Product("Zapatillas deportivas", 4500, "Zapatillas blancas con negro deportivas",'5.jpg', GlobalConstants.images[4]),
            new _Product("Conjunto de invierno femenino", 18400, "Conjunto invernal de color negro con blanco, 100% algodón",'6.jpg', GlobalConstants.images[5]),
            new _Product("Zapatillas deportivas femeninas", 8700, "Zapatillas  deportivas femeninas color bordó con blancas, con abrojos",'7.jpg', GlobalConstants.images[6]),
            new _Product("Hojotas femeninas", 3950, "Hojotas femeninas color rosado con amarillo con plataforma",'7.jpg', GlobalConstants.images[7]),
        ];
        
        this.refresh$ = this.refreshSource.asObservable();
        // this.product = null;
        
        this.products = exampleProducts;
        // this.products = [];
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
        // this.product = new _Product(product.title, product.price, product.description, product.image.name, product.image.url, product.id);
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