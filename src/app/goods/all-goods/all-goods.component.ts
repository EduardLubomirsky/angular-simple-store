import { Component, OnInit } from '@angular/core';
import { GoodService, FilterService } from 'src/app/shared/services';
import { Good } from 'src/app/shared/models';
import { Filter } from 'src/app/shared/models/filter';

@Component({
  selector: 'app-all-goods',
  templateUrl: './all-goods.component.html',
  styleUrls: ['./all-goods.component.scss']
})
export class AllGoodComponent implements OnInit {
  public allGoods: Good[];
  public filterObject: Filter;
  public showClearAll: boolean = false;
  public choosenFilter: Filter;
  constructor(private goodService: GoodService, private filterService: FilterService) {
    this.filterObject = new Filter;
    this.choosenFilter = new Filter;
    this.choosenFilter.priceFrom = null;
    this.choosenFilter.priceTo = null;
    

  }

  ngOnInit() {
    this.allGoods = this.goodService.getAllGoods("product");
    this.filterObject.category = 0;
  }

  public refreshView() {
    this.ngOnInit();
  }

  public applyFilter() {
    this.allGoods = this.goodService.getAllGoods("product");
    this.allGoods = this.filterService.filterApply(this.filterObject, this.allGoods);
    this.showClearAll = this.checkFilter();
    let bufFilter: string = JSON.stringify(this.filterObject);
    this.choosenFilter = JSON.parse(bufFilter);
  }

  public removePriceTo() {
    delete this.filterObject.priceTo;
    this.applyFilter();
  }

  public removePriceFrom() {
    delete this.filterObject.priceFrom;
    this.applyFilter();
  }

  public removeName() {
    delete this.filterObject.name;
    this.applyFilter();
  }

  public removeCategory() {
    this.filterObject.category = 0;
    this.applyFilter();
  }

  public clearAll() {
    this.filterObject = new Filter;
    this.applyFilter();
  }

  public checkFilter() {
    if(this.filterObject.name || this.filterObject.priceTo || this.filterObject.priceFrom || this.filterObject.category != 0) {
      return true;
    } else {
      return false;
    }
  }
}

