import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export const AccessUsersGuard: CanActivateFn = (route, state): Observable<boolean | import("@angular/router").UrlTree> => {
  const router = inject(Router);
  const apiService = inject(ApiService);

  return apiService.currentUserData.pipe(
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

