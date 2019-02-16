import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/services';
import { Good } from 'src/app/shared/models';
import { GoodService } from 'src/app/goods/services/good.service';

@Component({
  selector: 'app-add-good',
  templateUrl: './add-good.component.html',
  styleUrls: ['./add-good.component.scss']
})
export class AddGoodComponent implements OnInit {
  public image: string | ArrayBuffer;
  public newProduct: Good;
  constructor(private imageService: ImageService, private goodService: GoodService) {
    this.newProduct = new Good();
    //select default
    this.newProduct.category = "1";
    this.newProduct.inStock = true;
  }

  public changeListener(event) {
    this.imageService.readThis(event.target).then((result) => {
      this.newProduct.img = String(result);
      document.getElementById('preview').setAttribute('src', this.newProduct.img);
    });
  }

  public addNewProduct() {
    this.goodService.addNewGood('product', this.newProduct);
  }

  ngOnInit() {
  }

}
