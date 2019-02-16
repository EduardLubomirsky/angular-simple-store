import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllGoodComponent } from './all-goods/all-goods.component';
import { GoodsComponent } from './goods.component';
import { SingleGoodComponent } from './single-good/single-good.component';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: '', component: GoodsComponent, 
    children: [
      {path: 'all', component: AllGoodComponent },
      {path: 'single', component: SingleGoodComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsRoutingModule { }
