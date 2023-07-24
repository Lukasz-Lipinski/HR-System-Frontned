import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AuthService,
  IAdminCredential,
  IBackendReponse,
} from 'src/app/services/auth/auth.service';

export const accountPageResolver: ResolveFn<
  Observable<IAdminCredential | undefined>
> = (route, state) => {
  const authService = inject(AuthService);
  return authService.GetAdminCred();
};
