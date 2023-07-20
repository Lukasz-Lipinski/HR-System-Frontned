import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import {
  AuthService,
  IAdminCredential,
} from 'src/app/services/auth/auth.service';

export const accountPageResolver: ResolveFn<
  IAdminCredential | undefined
> = (route, state) => {
  const authService = inject(AuthService);
  authService.SetAdminCred();
  return authService.adminCredential.value;
};
