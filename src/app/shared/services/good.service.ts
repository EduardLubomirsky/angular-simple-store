import { Injectable } from '@angular/core';
import { Good, ChartGood } from 'src/app/shared/models';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class GoodService {

  public allGoods: Good[];
  public categoryGoods: string[] = ['All','Games','PC','Phone'];

  constructor(private storageService: StorageService) { }

  public getAllGoods<T>(key: string): T[] {
    let goods: T[] = this.storageService.getAllItems<T>(key);
    return goods;
  }

  public addNewGood(key: string, good: Good) {
    let all: Good[] = this.storageService.getAllItems<Good>(key);

    if (!all) {
      all = [];
    }

    this.allGoods = all;

    if (key !== 'chart') {
      let id = this.generateId();
      good.id = id;
    }

    this.allGoods.push(good);
    this.storageService.setItem(key, this.allGoods);
  }

  public removeGood(key: string, good: Good): Good[] {
    this.allGoods = this.getAllGoods(key);
    this.allGoods = this.allGoods.filter(x => x.id != good.id);
    this.storageService.setItem(key, this.allGoods);
    return this.allGoods;
  }

  public addToChart(good: ChartGood) {
    let goods: ChartGood[] = this.getAllGoods<ChartGood>('chart');

    if (!goods) {
      goods = [];
    }

    let index: number = -1;
    try {
      goods.forEach((x, i) => {

        if (x.id == good.id) {
          good = x;
          index = i;
          throw Error();
        }

      });
    } catch (e) {

    }

    if (index != -1) {
      let count = Number(good.count);
      good.count = ++count;
      goods.splice(goods.indexOf(good), 1, good);
    } else {
      good.count = 1;
      goods.push(good);
    }

    this.storageService.setItem('chart', goods);
  }

  public sortById(goods: ChartGood[]): ChartGood[] {
    return goods = goods.sort((x, y) => {
      if (x.id < y.id) { return -1; }
      if (x.id > y.id) { return 1; }
      return 0;
    });
  }

  public removeGoodFromChart(key: string, good: ChartGood) {
    let goods: ChartGood[] = this.getAllGoods<ChartGood>(key);
    let index: number = -1;
    try {
      goods.forEach((x, i) => {
        if (x.id == good.id) {
          if (good.count > 1) {
            good.count--;
            goods.splice(i, 1);
            goods.push(good);
            goods = this.sortById(goods);
          } else {
            goods.splice(i, 1);
            goods = this.sortById(goods);
          }
          throw Error();
        }
      });
    } catch (e) {

    }
    this.storageService.setItem(key, goods);
    return goods;
  }

  public generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
