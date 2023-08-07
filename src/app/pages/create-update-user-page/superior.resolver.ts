import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { IBackendReponse } from 'src/app/services/auth/auth.service';
import { ISuperior } from 'src/app/services/employees/employees.service';
import { SuperiorsService } from 'src/app/services/superiors/superiors.service';

export const SuperiorResolver: ResolveFn<
  Observable<IBackendReponse<ISuperior[]>>
> = (route, state) => {
  const superiorsService = inject(
    SuperiorsService
  );

  return superiorsService.getSuperiors();
};
