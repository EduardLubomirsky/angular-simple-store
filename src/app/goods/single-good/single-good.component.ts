import { Component, OnInit, Input, Output } from '@angular/core';
import { Good, ChartGood } from 'src/app/shared/models';
import { GoodService, AlertService, StorageService } from 'src/app/shared/services';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-single-good',
  templateUrl: './single-good.component.html',
  styleUrls: ['./single-good.component.scss']
})

export class SingleGoodComponent implements OnInit {
  
  @Input() good:Good;
  @Output() deleteAction = new EventEmitter();

  constructor(private goodServices: GoodService,
              private alertService: AlertService,
              private storageService: StorageService) { 
  }

  ngOnInit() {

  }

  public deleteGood(good: Good) {
    this.storageService.deleteItem('products', good.id).subscribe((response) => {
      this.deleteAction.emit();
      this.alertService.subject.next();
      this.alertService.success("Item "+good.name+" was sacessfuly deleted!"); 
    });
    
    
  }

  public addToChart(good: ChartGood) {
    this.goodServices.addToChart(good); 
  }

}
