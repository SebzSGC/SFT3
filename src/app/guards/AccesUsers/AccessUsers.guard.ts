import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const AccessUsersGuard: CanActivateFn = (route, state): Observable<boolean | import("@angular/router").UrlTree> => {
  const router = inject(Router);

  const isAdmin = inject(ApiService);
  return isAdmin.isAdmin().pipe(
    map(isAdmin => isAdmin ? true : router.createUrlTree(['/NotAuthorized']))
  );
};
