import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [

  { path: '', redirectTo: '/inicio', pathMatch: 'full' },

  {
    path: 'inicio',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  { path: 'mi-carrito',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },

  { path: 'usuario',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),  
  },

  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
