import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { GlobalConstants } from 'src/app/constants/global-constants';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  public imageUrl: string | null | undefined;
  public imageName: string | undefined;
  public btnAddEdit: string;
  public btnCancel: string;
  public productForm: any;
  public subscription: Subscription;
  public propTitle: string;
  public prorpPrice: string;
  public propDescription: string;
  public propUploadImage: string;
  

  constructor (
    private productService: ProductsService,
    private toastService: ToastService
    ) {
      this.subscription = new Subscription();
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
    this.subscription = this.productService.refresh$.subscribe(() => {
      this.imageUrl = this.productService.product?.image.url;
      this.imageName = this.productService.product?.image.name;
      this.btnAddEdit = GlobalConstants.props.btnEdit;
      this.productForm.setValue({
        title: this.productService.product?.title,
        price: this.productService.product?.price,
        description: this.productService.product?.description,
        image: this.productService.product?.image.url,
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
      this.productService.product?.id || null,
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
