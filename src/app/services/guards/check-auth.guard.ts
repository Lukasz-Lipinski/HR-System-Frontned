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
    auth.SetAdminCred();
    return router.createUrlTree(['dashboard']);
  }

  return true;
};

export const CheckIfLoggedGuard: CanActivateFn = (
  route,
  state
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const adminCred =
    authService.adminCredential.getValue();
  const token = sessionStorage.getItem('token');

  return adminCred && token
    ? router.createUrlTree(['dashboard'])
    : router.createUrlTree(['sign-in']);
};

export const CheckIfSubpageCanActivate: CanActivateChildFn =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const user = auth.adminCredential.getValue();
    console.log(user);
    return user
      ? true
      : router.createUrlTree(['sign-in']);
  };
