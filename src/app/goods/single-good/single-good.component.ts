import { Component, OnInit, Input, Output } from '@angular/core';
import { Good } from 'src/app/shared/models';
import { GoodService } from '../services/good.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-single-good',
  templateUrl: './single-good.component.html',
  styleUrls: ['./single-good.component.scss']
})
export class SingleGoodComponent implements OnInit {
  
  @Input() good:Good;
  @Output() deleteAction = new EventEmitter<boolean>();

  constructor(private goodServices: GoodService) { }

  ngOnInit() {

  }



  public deleteGood(good: Good) {
    this.goodServices.allGoods = this.goodServices.removeGood('product', good);
    this.deleteAction.emit(true);
    
  }
}
