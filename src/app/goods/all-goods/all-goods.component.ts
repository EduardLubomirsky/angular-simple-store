import { Component, OnInit } from '@angular/core';
import { GoodService, FilterService, StorageService } from 'src/app/shared/services';
import { Filter, Good } from 'src/app/shared/models';

@Component({
  selector: 'app-all-goods',
  templateUrl: './all-goods.component.html',
  styleUrls: ['./all-goods.component.scss']
})
export class AllGoodComponent implements OnInit {
  public allGoods: Good[] = [];
  public goodForfilter: Good[] = [];
  public filterObject: Filter;
  public showClearAll: boolean = false;
  public choosenFilter: Filter;

  constructor(private goodService: GoodService,
    private filterService: FilterService,
    private storageService: StorageService
  ) {
    this.filterObject = new Filter;
    this.choosenFilter = new Filter();
  }

  ngOnInit() {
    this.storageService.getAllItems("products").subscribe((response: Response) => {
      this.allGoods = <Good[]>JSON.parse(JSON.stringify(response));
      this.goodForfilter = <Good[]>JSON.parse(JSON.stringify(this.allGoods));
    });
    this.filterObject.category = "0";
    this.choosenFilter.category = "0";

  }

  public refreshView() {
    this.ngOnInit();
  }

  public applyFilter() {
      this.allGoods = JSON.parse(JSON.stringify(this.goodForfilter));
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
    this.filterObject.category = "0";
    this.applyFilter();
  }

  public clearAll() {
    this.filterObject = new Filter;
    this.applyFilter();
    this.filterObject.category = "0";
    this.showClearAll = false
  }

  public checkFilter() {
    if (this.filterObject.name || this.filterObject.priceTo || this.filterObject.priceFrom || this.filterObject.category != "0") {
      return true;
    } else {
      return false;
    }
  }
}

