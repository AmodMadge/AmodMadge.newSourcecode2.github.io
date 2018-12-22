import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, ViewContainerRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CryptoService } from './crypto.service';

import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { StorageServiceModule} from 'angular-webstorage-service';
import { RouterModule,Routes, Router } from '@angular/router';
//import { ChartModule } from 'angular-highcharts';
import 'hammerjs';
import { ListViewComponent } from './list-view/list-view.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { ChartViewComponent } from './chart-view/chart-view.component';
import { ComparisonViewComponent } from './comparison-view/comparison-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    FavouriteComponent,
    ChartViewComponent,
    ComparisonViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OrderModule,   
    StorageServiceModule,
    HttpClientModule,
    NgxPaginationModule,
    IonRangeSliderModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot([
      {path:'listView', component: ListViewComponent},
      {path:'', redirectTo:'listView',pathMatch:'full'},
      {path :'priceChart/:id', component: ChartViewComponent},
      {path :'comparisonView', component: ComparisonViewComponent},
      {path :'favourites', component: FavouriteComponent}

])
  ],
  providers: [CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
