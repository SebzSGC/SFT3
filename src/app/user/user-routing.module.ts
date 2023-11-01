import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableProductComponent } from './components/table-product/table-product.component';
import { TableUserComponent } from './components/table-user/table-user.component';
import { AccessUsersGuard } from '../guards/AccesUsers/AccessUsers.guard';

const routes: Routes = [
  {
    path: 'administrador',
    canMatch:[AccessUsersGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tabla-usuarios', component: TableUserComponent },
    ],
  },
  {
    path: 'empleado',
    canMatch:[AccessUsersGuard],
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
