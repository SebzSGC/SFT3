import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprasComponent } from './components/compras/compras.component';
import { ProfileComponent } from './components/view-profile/profile.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
  },
  {
     path: 'compras', component: ComprasComponent 
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
export class ProfileRoutingModule {}
