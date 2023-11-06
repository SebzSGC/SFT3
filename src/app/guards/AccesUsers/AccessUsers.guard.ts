import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsuarioService } from 'src/app/service/Usuario/usuario.service';

export const AccessUsersGuard: CanActivateFn = (route, state): Observable<boolean | import("@angular/router").UrlTree> => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  return usuarioService.currentUserData.pipe(
    switchMap((userData) => {
      if (!userData) {
        return of(router.createUrlTree(['/auth/login']));
      } else {
        if (userData.Cargo === 'EMPLEADO') {
          return of(true);
        } else {
          if (userData.Cargo === 'ADMINISTRADOR') {
            return of(true);
          } else {
            return of(router.createUrlTree(['/NotAuthorized']));
        }
      }
    }
    })
  );
};

