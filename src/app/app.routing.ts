import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { FullLayoutComponent } from './shared/components';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: FullLayoutComponent,
    loadChildren: 'src/app/user/user.module#UserModule',
    canActivate: [AuthGuard] 
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'products',
    component: FullLayoutComponent,
    loadChildren: 'src/app/goods/goods.module#GoodsModule',
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }