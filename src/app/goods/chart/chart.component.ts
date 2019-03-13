import { Component, OnInit } from '@angular/core';
import { ValidationService, PaymentService, AlertService } from 'src/app/shared/services';
import { StorageService } from 'src/app/shared/services';
import { ChartGood, Card, CardValidation } from 'src/app/shared/models';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public allGoods: ChartGood[] = [];
  public totalPrice: number;
  public card: Card;
  public cardValidationModel: CardValidation;

  constructor(private storageService: StorageService, 
              private validationService: ValidationService,
              private paymentService: PaymentService, 
              private alertService: AlertService) {
    this.card = new Card;
    this.cardValidationModel = new CardValidation;
    this.storageService.getAllItems('chart').subscribe((response: ChartGood[]) => {
      this.allGoods = response;  
      this.totalPrice = this.getTotalPrice();
    });
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
    good.count--;
    if(good.count > 0) {
      this.storageService.updateItem('chart', good).subscribe(response => {});
    } else {
      let indexToDelete = this.allGoods.indexOf(good);
      this.allGoods.splice(indexToDelete, 1);
      this.storageService.deleteItem('chart', Number(good.id)).subscribe(response => {});
    }
    this.totalPrice = this.getTotalPrice();
  }

  public purchaseOrder() {
    if(this.validationService.cardValidation(this.card, this.cardValidationModel)) {
      if(this.paymentService.purchaseOrder(this.card, this.totalPrice)) {
        this.allGoods = [];
        this.storageService.setItem('chart', this.allGoods).subscribe((response: Response) => {
          
        });
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
