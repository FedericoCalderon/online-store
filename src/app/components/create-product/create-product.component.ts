import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalDataService } from 'src/app/data/global-data.service';
import { GlobalConstants } from 'src/app/constants/global-constants';

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
    private globalDataService: GlobalDataService
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
    this.subscription = this.globalDataService.refresh$.subscribe(() => {
      this.imageUrl = this.globalDataService.product?.image.url;
      this.imageName = this.globalDataService.product?.image.name;
      this.btnAddEdit = GlobalConstants.props.btnEdit;
      this.productForm.setValue({
        title: this.globalDataService.product?.title,
        price: this.globalDataService.product?.price,
        description: this.globalDataService.product?.description,
        image: this.globalDataService.product?.image.url,
      });
    })
  }
 
  public onSelectImage(event: any) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event?.target?.files[0]);

    fileReader.onload = _event => {
      if (typeof fileReader.result == 'string') {
        this.imageUrl = fileReader.result;
        console.log(this.imageUrl);
        
        return;
      }
      this.imageUrl = null;
    }
    this.imageName = event?.target?.files[0]?.name;
    
  }

  public addProduct() {
    this.globalDataService.insertProduct(
      this.productForm.get('title').value,
      this.productForm.get('price').value,
      this.productForm.get('description').value,
      this.imageName || "",
      this.imageUrl || "",
      this.globalDataService.product?.id || null,
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
  }

}
