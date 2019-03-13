import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  public setItem<T>(key:string, item: T) {
    return this.http.post('http://localhost:3000/' + key, item);
  }

  public updateItem<T>(key:string, item: T) {
    debugger;
    return this.http.put('http://localhost:3000/' + key + '/'+ (item as any).id, item);
  }

  public getAllItems(key: string){
    return this.http.get('http://localhost:3000/' + key);
  }

  public deleteItem(key: string, id: number){
    return this.http.delete('http://localhost:3000/' + key + '/' + id);
  }
}
