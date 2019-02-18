import { Component, OnInit, Output } from '@angular/core';
import { GoodService, ValidationService, PaymentService, AlertService } from 'src/app/shared/services';
import { StorageService } from 'src/app/shared/services';
import { Good, ChartGood, Card, CardValidation } from 'src/app/shared/models';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public allGoods: ChartGood[];
  public totalPrice: number;
  public card: Card;
  public cardValidationModel: CardValidation;

  constructor(private storageService: StorageService, 
              private goodService: GoodService,
              private validationService: ValidationService,
              private paymentService: PaymentService, 
              private alertService: AlertService) {
    this.card = new Card;
    this.cardValidationModel = new CardValidation;
    this.allGoods = this.storageService.getAllItems<ChartGood>('chart');
    if (!this.allGoods) {
      this.allGoods = [];
    }
    this.allGoods = this.goodService.sortById(this.allGoods);
    this.totalPrice = this.getTotalPrice();
  }

  public getTotalPrice(): number {
    let buff: number = 0;
    if (!this.allGoods) {
      this.allGoods = [];
    }
    this.allGoods.forEach(x => {
      buff = Number(x.price) * x.count + buff;
    });
    return buff;
  }

  public removeGood(good: ChartGood) {
    this.allGoods = this.goodService.removeGoodFromChart('chart', good);
    this.totalPrice = this.getTotalPrice();
  }

  public purchaseOrder() {
    if(this.validationService.cardValidation(this.card, this.cardValidationModel)) {
      if(this.paymentService.purchaseOrder(this.card, this.totalPrice)) {
        this.allGoods = [];
        this.storageService.setItem('chart', this.allGoods);
        this.card = new Card;
        this.cardValidationModel = new CardValidation;
      }  
    } else {
      this.alertService.error("Incorect information about card");
    }
    
  }

  ngOnInit() {

  }

}
