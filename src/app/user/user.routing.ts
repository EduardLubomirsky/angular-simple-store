import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { AddGoodComponent } from './add-good/add-good.component';
import { EditGoodComponent } from './edit-good/edit-good.component';

const routes: Routes = [
  { path: '', redirectTo: 'add', pathMatch: 'full' },
  {path: '', component: UserComponent, 
    children: [
      {path: 'add', component: AddGoodComponent },
      {path: 'edit/:id', component: EditGoodComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
