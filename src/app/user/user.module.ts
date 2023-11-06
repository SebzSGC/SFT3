import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TableUserComponent } from './components/table-user/table-user.component';
import { TableProductComponent } from './components/table-product/table-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [
    DashboardComponent,
    TableProductComponent,
    TableUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxChartsModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class UserModule { }
