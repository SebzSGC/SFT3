import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCartComponent } from './components/view-cart/view-cart.component';

const routes: Routes = [
  { 
    path: '',
    component: ViewCartComponent,
    children: []
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
