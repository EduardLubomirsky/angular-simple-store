import { Injectable } from '@angular/core';
import { Filter, Good } from 'src/app/shared/models';

@Injectable({
    providedIn: 'root'
})

export class FilterService {
    constructor() { }

    public filterApply(filterObject: Filter, filteredArray: Good[]): Good[] {
        if (filterObject.name) {
            filteredArray = filteredArray.filter(x =>
                x.name.toLowerCase().indexOf(filterObject.name.toLowerCase()) != -1
            );
        }

        if (filterObject.category != '0' && filterObject.category) {
            filteredArray = filteredArray.filter(x => {
                return parseInt(filterObject.category) == parseInt(x.category);
            });
        }

        if (filterObject.priceTo) {
            filteredArray = filteredArray.filter(x => {
                return Number(x.price) <= Number(filterObject.priceTo);
            });
        }

        if (filterObject.priceFrom) {
            filteredArray = filteredArray.filter(x => {
                return Number(x.price) >= Number(filterObject.priceFrom);
            });
        }
        return filteredArray;
    }
}
