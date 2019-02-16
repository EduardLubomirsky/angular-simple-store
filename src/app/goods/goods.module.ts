import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllGoodComponent } from './all-goods/all-goods.component';
import { SingleGoodComponent } from './single-good/single-good.component';
import { DetailGoodComponent } from './detail-good/detail-good.component';
import { GoodsComponent } from './goods.component';
import { GoodsRoutingModule } from './goods.routing';
import { GoodService } from './services/good.service';
import { ImageService } from '../shared/services';
import { ChartComponent } from './chart/chart.component';

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
    GoodsRoutingModule
  ],
  providers: [
    GoodService,
    ImageService
  ]
})
export class GoodsModule { }
