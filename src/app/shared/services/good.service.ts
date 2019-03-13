import { Injectable } from '@angular/core';
import { Good, ChartGood } from 'src/app/shared/models';
import { StorageService } from 'src/app/shared/services/storage.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class GoodService {

  public allGoods: Good[];
  public categoryGoods: string[] = ['All', 'Games', 'PC', 'Phone'];

  constructor( private storageService: StorageService,
               private http: HttpClient,
               private alertService: AlertService) { }

  public addNewGood(key: string, good: Good) {
    this.storageService.setItem(key, good).subscribe((response: Response) => {

    });
  }

  public removeGood(key: string, id: number) {
    return this.http.delete('http://localhost:3000/' + key + '/' + id);
  }

  public addToChart(good: ChartGood) {
    this.storageService.getAllItems('chart').subscribe((response: ChartGood[]) => {
      let goods:ChartGood[] = response;
      let index: number = -1;
      for(let i = 0; i < goods.length; i++) {
        if (goods[i].id == good.id) {
          good = goods[i];
          index = i;
          break;
        }
      }

      if (index != -1) {
        let count = Number(good.count);
        good.count = ++count;
        goods.splice(goods.indexOf(good), 1, good);
        this.storageService.updateItem('chart', good).subscribe((response: Response) => {
          this.alertService.subject.next();
          this.alertService.success("Item " + good.name + " was sacessfuly added to chart (" + good.count + ")");
        });
      } else {
        good.count = 1;
        goods.push(good);
        this.storageService.setItem('chart', good).subscribe((response: Response) => {
          this.alertService.subject.next();
          this.alertService.success("Item " + good.name + " was sacessfuly added to chart");
        });
      }
    });
  }
}
