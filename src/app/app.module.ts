import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularMaterialModule } from './angular-material.module';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemListComponent } from './components/item-list/item-list.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CadimentListComponent } from './components/cadiment-list/cadiment-list.component';
import { LoginComponent } from './pages/login/login.component';
import { SampleComponent } from './pages/sample/sample.component';
import { BoostrapComponent } from './pages/boostrap/boostrap.component';

@NgModule({
  declarations: [
    AppComponent,
    ReceiptComponent,
    ItemListComponent,
    CalculatorComponent,
    CategoryListComponent,
    ProductListComponent,
    CadimentListComponent,
    LoginComponent,
    SampleComponent,
    BoostrapComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
