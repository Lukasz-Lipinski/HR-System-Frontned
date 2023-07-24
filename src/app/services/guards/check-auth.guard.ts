import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { of, switchMap } from 'rxjs';

export const CheckAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.adminCredential.getValue();
  return user
    ? true
    : router.createUrlTree(['sign-in']);
};

export const SignInPageGuard: CanActivateFn = (
  route,
  state
) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const localToken =
    sessionStorage.getItem('token');

  if (localToken) {
    return router.createUrlTree(['dashboard']);
  }
  return true;
};

export const CheckIfLoggedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');

  if (token) {
    return router.createUrlTree(['dashboard']);
  }
  return router.createUrlTree(['sign-in']);
};

export const CheckIfSubpageCanActivate: CanActivateChildFn =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const user = auth.adminCredential.getValue();

    if (user) {
      console.log(
        '🚀 ~ file: check-auth.guard.ts:76 ~ user:',
        user
      );

      return true;
    }

    return false;
    // return user
    //   ? true
    //   : router.createUrlTree(['sign-in']);
  };
