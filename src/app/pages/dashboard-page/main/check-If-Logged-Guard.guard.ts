import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

export const checkIfLoggedGuard: CanActivateFn = (
  route,
  state
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const localToken =
    sessionStorage.getItem('token');

  if (localToken) {
    authService.SetAdminCred();
    return router.navigate(['dashboard']);
  }

  return router.navigate(['sign-in']);
};
