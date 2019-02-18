import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllGoodComponent } from './all-goods/all-goods.component';
import { SingleGoodComponent } from './single-good/single-good.component';
import { DetailGoodComponent } from './detail-good/detail-good.component';
import { GoodsComponent } from './goods.component';
import { GoodsRoutingModule } from './goods.routing';
import { GoodService, ImageService } from 'src/app/shared/services';

import { ChartComponent } from './chart/chart.component';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  declarations: [
    AllGoodComponent,
    SingleGoodComponent,
    DetailGoodComponent,
    GoodsComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    GoodsRoutingModule,
    SharedModule
  ],
  providers: [
    GoodService,
    ImageService
  ]
})
export class GoodsModule { }
