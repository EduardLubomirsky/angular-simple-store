import { Component, OnInit } from '@angular/core';
import { ImageService, AlertService, GoodService, ValidationService } from 'src/app/shared/services';
import { Good, GoodValidation } from 'src/app/shared/models';


@Component({
  selector: 'app-add-good',
  templateUrl: './add-good.component.html',
  styleUrls: ['./add-good.component.scss']
})
export class AddGoodComponent implements OnInit {
  public image: string | ArrayBuffer;
  public newProduct: Good;
  public newProductValidation: GoodValidation;
  public category: string[];

  constructor(
      private imageService: ImageService,
      private goodService: GoodService, 
      private validationService: ValidationService,
      private alertService: AlertService
  ) {
    this.newProduct = new Good;
    this.newProductValidation = new GoodValidation;
    //select default
    this.newProduct.category = "1";
    let buff: string = JSON.stringify(this.goodService.categoryGoods);
    this.category = JSON.parse(buff);
    this.category.splice(0,1);
  }

  public changeListener(event) {
    this.imageService.readThis(event.target).then((result) => {
      this.newProduct.img = String(result);
      document.getElementById('preview').setAttribute('src', this.newProduct.img);
    });
  }

  public addNewProduct() {
    this.alertService.subject.next();
    
    if(this.validationService.goodValidation(this.newProduct, this.newProductValidation)){
      this.goodService.addNewGood('products', this.newProduct);
      this.alertService.success("Item "+this.newProduct.name+" was sacessfuly added!");
      this.newProductValidation = new GoodValidation;
      this.newProduct = new Good;
      this.newProduct.category = "1";
      document.getElementById('preview').setAttribute('src', '../assets/img/preview.png');
    } else {
      this.alertService.error("Some fields are incorrect!");
    }
  }

  ngOnInit() {
  }

}
