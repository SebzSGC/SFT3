import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean | import("@angular/router").UrlTree> => {
  const router = inject(Router);

  const isLogged = inject(ApiService);
  return isLogged.getAuthToken().pipe(
    map(getAuthToken => getAuthToken ? true : router.createUrlTree(['/auth/login']))
  );
};
