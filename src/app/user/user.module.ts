import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user.routing';

import { AddGoodComponent } from './add-good/add-good.component';
import { EditGoodComponent } from './edit-good/edit-good.component';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  declarations: [
    AddGoodComponent,
    EditGoodComponent,
    UserComponent
    ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
