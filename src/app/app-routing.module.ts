import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ReceiptComponent} from '../app/pages/receipt/receipt.component';
import {LoginComponent} from '../app/pages/login/login.component';
import {SampleComponent} from '../app/pages/sample/sample.component';
import { BoostrapComponent } from './pages/boostrap/boostrap.component';
import { ReceiptListComponent } from './pages/receipt-list/receipt-list.component';
import { ReceiptDetailComponent } from './pages/receipt-detail/receipt-detail.component';
import { TableLayoutComponent } from './pages/table-layout/table-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'receipt',
    component: ReceiptComponent,
  },
  {
    path: 'sample',
    component: SampleComponent,
  },
  {
    path: 'boostrap',
    component: BoostrapComponent,
  },
  {
    path: 'receipt-list',
    component: ReceiptListComponent,
  },
  {
    path: 'receipt-detail',
    component: ReceiptDetailComponent,
  },
  {
    path: 'table-layout',
    component: TableLayoutComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { 
    }),
    CommonModule
  ],
  exports: [
    RouterModule,
    CommonModule,
  ],
})
export class AppRoutingModule { }
