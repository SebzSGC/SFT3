import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { authGuard } from './guards/auth/auth.guard';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

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

  {
    path: 'perfil',
    canMatch:[authGuard],
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
  },

  { path: 'mi-carrito',
    canMatch:[authGuard],
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },

  { path: 'usuario',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),  
  },

  {
    path: 'NotAuthorized',
    component: NotAuthorizedComponent
  },

  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
