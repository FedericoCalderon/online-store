import { _Product } from "../models/Product.model";

export class Store {
    // public static generateId() {
    //     if (!localStorage.getItem('privateId')) {
    //         localStorage.setItem('privateId', '1');
    //     }
    //     return parseInt(String(localStorage.getItem('privateId')));
    // }
    private static getLocalProducts() {
        return localStorage.getItem('products');
    }

    public static setProduct(product: _Product): void {
        let productJson: Object;

        if (!Store.getLocalProducts()){
            localStorage.setItem('products', '[]');
        }
        productJson = JSON.parse(String(Store.getLocalProducts())).push(product);
        localStorage.setItem('products', JSON.stringify(productJson));
    }

    public static getProducts() {
        if (Store.getLocalProducts()) {
            const productsJson = JSON.parse(String(Store.getLocalProducts()));
            return productsJson;
        }
    }
}