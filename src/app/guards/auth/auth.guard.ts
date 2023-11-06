import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/service/Usuario/usuario.service';

export const authGuard: CanActivateFn = (route, state): Observable<boolean | import("@angular/router").UrlTree> => {
  const router = inject(Router);

  const isLogged = inject(UsuarioService);
  return isLogged.getAuthToken().pipe(
    map(getAuthToken => getAuthToken ? true : router.createUrlTree(['/auth/login']))
  );
};
