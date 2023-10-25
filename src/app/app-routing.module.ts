import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { TableUserComponent } from './components/table-user/table-user.component';
import { TableProductComponent } from './components/table-product/table-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full'}, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'viewCart', component: ViewCartComponent },
  { path: 'tabla-usuarios', component: TableUserComponent },
  { path: 'tabla-productos', component: TableProductComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path:'**', component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
