import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeProductsComponent } from './components/home-products/home-products.component';


import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomeProductsComponent 
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
