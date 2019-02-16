import { Injectable } from '@angular/core';
import { Good } from 'src/app/shared/models';
import { StorageService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class GoodService {

  public allGoods: Good[];

  constructor(private storageService: StorageService) { }

  public getAllGoods(key: string) {
      let goods: Good[] = this.storageService.getAllItems<Good>(key);
      return goods;
  }

  public addNewGood(key: string, good: Good) {
      let all: Good[] = this.storageService.getAllItems<Good>(key);
      if(!all) {
        all = [];
      }
      this.allGoods = all;
      let id = this.generateId();
      good.id = id;
      this.allGoods.push(good);
      this.storageService.setItem(key, this.allGoods);
  }

  public removeGood(key: string, good:Good): Good[] {
      this.allGoods = this.getAllGoods(key);
      this.allGoods = this.allGoods.filter(x => x.id != good.id);
      this.storageService.setItem(key, this.allGoods);
      return this.allGoods;
  }
  public generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
