import { Component, OnInit } from '@angular/core';
import { GoodService } from '../services/good.service';
import { Good } from 'src/app/shared/models';

@Component({
  selector: 'app-all-goods',
  templateUrl: './all-goods.component.html',
  styleUrls: ['./all-goods.component.scss']
})
export class AllGoodComponent implements OnInit {
  public allGoods: Good[];
  constructor(private goodService: GoodService) {
   
  }
  ngOnInit() {
    this.allGoods = this.goodService.getAllGoods("product");
  }
  public refreshView() {
    this.ngOnInit();
  }
}
