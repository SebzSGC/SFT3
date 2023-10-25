import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeProductsComponent } from './components/home-products/home-products.component';
import { HomeComponent } from './components/home/home.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { TableUserComponent } from './components/table-user/table-user.component';
import { TableProductComponent } from './components/table-product/table-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    ErrorComponent,
    HomeProductsComponent,
    HomeComponent,
    ViewCartComponent,
    TableUserComponent,
    TableProductComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
