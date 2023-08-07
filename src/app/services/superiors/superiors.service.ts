import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Inject,
  Injectable,
  inject,
} from '@angular/core';
import { environment } from 'src/app/env/environment';
import { IBackendReponse } from '../auth/auth.service';
import { ISuperior } from '../employees/employees.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperiorsService {
  private http = inject(HttpClient);
  constructor(
    @Inject('LocalEnv')
    private env: typeof environment
  ) {}

  getSuperiors() {
    const url =
      this.env.apiUrl + '/api/superior/all';
    return this.http
      .get<IBackendReponse<ISuperior[]>>(url, {
        headers: {
          Authorization:
            'Bearer ' +
            sessionStorage.getItem('token'),
        },
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const res: IBackendReponse<
            ISuperior[]
          > = {
            code: 0,
            data: [],
            error: true,
            message: err.message,
          };
          return of(res);
        })
      );
  }
}
