import { Injectable } from '@angular/core';
import { Card } from 'src/app/shared/models';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private alertService: AlertService) { }

  public purchaseOrder(card: Card, amount: number): boolean {
    this.alertService.success("Payment in the amount of "+ amount +"$ was successful");
    return true;
  }
}
