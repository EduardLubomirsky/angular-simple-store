import { Injectable } from '@angular/core';
import { Card, Good, CardValidation, GoodValidation } from 'src/app/shared/models';
import { isNumber } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public cardValidation(cardModel: Card, validationModel: CardValidation) {
    
    if(cardModel.num && isNumber(Number(cardModel.num))) {
      let cardLength: number = cardModel.num.toString().length;
      if(cardLength === 16) {
        validationModel.num = true;
      } else validationModel.num = false;
    } else validationModel.num = false;

    if(cardModel.cvc && isNumber(Number(cardModel.cvc))) {
      let cvcLength: number = cardModel.cvc.toString().length;
      if(cvcLength === 3) {
        validationModel.cvc = true;
      } else {
        validationModel.cvc = false;
      }
    } else {
      validationModel.cvc = false;
    }
    if(cardModel.expiration) {
      let separateDate = cardModel.expiration.split('/');
      if(separateDate.length === 2) {
        if((parseInt(separateDate[0]) && Number(separateDate[0]) <= 12) &&
           (parseInt(separateDate[1]) && Number(separateDate[1]) <= 31)) {
          validationModel.expiration = true;
        } else {
          validationModel.expiration = false;
        } 
      } else {
        validationModel.expiration = false;
      }
    } else {
      validationModel.expiration = false;
    }

    if(validationModel.num && validationModel.cvc && validationModel.expiration) {
      return true;
    } else {
      return false;
    }
  }
  public goodValidation(goodModel:Good, validationModel: GoodValidation): boolean {

    if('name' in goodModel && goodModel.name) {
      validationModel.name = true;
    } else {
      validationModel.name = false
    }

    if('price' in goodModel && goodModel.price) {
      if(parseFloat(goodModel.price.toString())) {
        validationModel.price = true;
      } else {
        validationModel.price = false;
      }
    } else {
      validationModel.price = false;
    }

    if(validationModel.price && validationModel.name) {
      return true;
    } else {
      return false;
    }
  }
}
