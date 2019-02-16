import { Injectable } from '@angular/core';
import { Good } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public isKey(key: string): boolean { //TODO
    let temp: string = localStorage.getItem(key);
    return true;
  }

  public setItem<T>(key:string, item: T[]) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  public getAllItems<T>(key: string): T[]{
    let goods: T[] = JSON.parse(localStorage.getItem(key));
    return goods;
  }

}
