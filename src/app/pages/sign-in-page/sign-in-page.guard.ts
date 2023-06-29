import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

export const signInPageGuard: CanActivateFn = (
  route,
  state
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const adminCred =
    authService.adminCredential.getValue();
  const token = sessionStorage.getItem('token');

  return adminCred || token
    ? router.navigate(['dashboard'])
    : true;
};
