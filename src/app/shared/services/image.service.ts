import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  public readThis(inputValue: HTMLInputElement): any {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(inputValue.files[0]);
      reader.onload = function () {
        if(!((inputValue.files[0].type == "image/png") || (inputValue.files[0].type == "image/jpeg") || (inputValue.files[0].type == "image/jpg"))) {
          reject(Error(
            'error while processing file' + reader.readyState
          ))
        }
        if (reader.readyState === 2) {
          resolve(reader.result.toString());
        }
        reject(Error(
          'error while processing file' + reader.readyState
        ))
      }
    });
  }
}
