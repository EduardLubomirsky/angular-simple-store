import { Component, OnInit, Input, Output } from '@angular/core';
import { Good, ChartGood } from 'src/app/shared/models';
import { GoodService, AlertService } from 'src/app/shared/services';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-single-good',
  templateUrl: './single-good.component.html',
  styleUrls: ['./single-good.component.scss']
})
export class SingleGoodComponent implements OnInit {
  
  @Input() good:Good;
  @Output() deleteAction = new EventEmitter<boolean>();

  constructor(private goodServices: GoodService, private alertService: AlertService) { 
  }

  ngOnInit() {

  }

  public deleteGood(good: Good) {
    this.goodServices.allGoods = this.goodServices.removeGood('product', good);
    this.alertService.subject.next();
    this.alertService.success("Item "+good.name+" was sacessfuly deleted!"); 
    this.deleteAction.emit(true);
  }

  public addToChart(good: ChartGood) {
    this.alertService.subject.next();
    this.alertService.success("Item "+good.name+" was sacessfuly added to chart");
    this.goodServices.addToChart(good); 
  }

}
