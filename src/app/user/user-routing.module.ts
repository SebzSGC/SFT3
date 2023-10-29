import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableProductComponent } from './components/table-product/table-product.component';

const routes: Routes = [
  {
    path: 'administrador',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tabla-usuarios', component: TableProductComponent },
    ],
  },
  {
    path: 'empleado',
    children: [{ path: 'tabla-productos', component: TableProductComponent }],
  },
  {
    path: '**',
    redirectTo: '/inicio',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
