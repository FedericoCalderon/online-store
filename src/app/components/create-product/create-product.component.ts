import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { GlobalConstants } from 'src/app/constants/global-constants';
import { _Product } from 'src/app/models/Product.model';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  public id: number;
  public imageUrl: string | null | undefined;
  public imageName: string | undefined;
  public btnAddEdit: string;
  public btnCancel: string;
  public productForm: any;
  public propTitle: string;
  public prorpPrice: string;
  public propDescription: string;
  public propUploadImage: string;
  

  constructor (
    private productService: ProductsService,
    ) {
      this.id = -1;
      this.imageUrl = "";
      this.imageName = "";
      this.btnAddEdit = GlobalConstants.props.btnAdd;
      this.btnCancel = GlobalConstants.props.btnCancel;
      
      this.propTitle = GlobalConstants.props.title;
      this.prorpPrice = GlobalConstants.props.price;
      this.propDescription = GlobalConstants.props.description;
      this.propUploadImage = GlobalConstants.props.uploadImage;

      this.productForm = new FormGroup({
        title: new FormControl("", Validators.required),
        price: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        image: new FormControl("", Validators.required)
      }); 
  }

  ngOnInit(): void {
    this.productService.refresh$.subscribe((product: _Product) => {
      this.id = product?.id;
      this.imageUrl = product?.image.url;
      this.imageName = product?.image.name;
      this.btnAddEdit = this.id == -1 ? GlobalConstants.props.btnAdd : GlobalConstants.props.btnEdit;
      this.productForm.setValue({
        title: product?.title,
        price:  this.id == -1 ? "": product.price,
        description: product?.description,
        image: product?.image.url,
      });
    })
  }
 
  public onSelectImage(event: any) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event?.target?.files[0]);

    fileReader.onload = _event => {
      if (typeof fileReader.result == 'string') {
        this.imageUrl = fileReader.result;
        return;
      }
      this.imageUrl = null;
    }
    this.imageName = event?.target?.files[0]?.name;
    
  }

  public addProduct() {
    this.productService.insertProduct(
      this.productForm.get('title').value,
      this.productForm.get('price').value,
      this.productForm.get('description').value,
      this.imageName || "",
      this.imageUrl || "",
      this.id == -1 ? null : this.id,
    );
    this.reset();
  }

  public isDisabledBtn() {
    return this.productForm.get('title').value == '' || 
    this.productForm.get('price').value == '' || 
    this.productForm.get('description').value == '' || 
    this.imageUrl == '';
  }
  
  public reset() {
    this.productForm.reset();
    this.imageName = "";
    this.imageUrl = "";
    this.btnAddEdit = GlobalConstants.props.btnAdd;
    this.productService.resetProduct();
  }

}
