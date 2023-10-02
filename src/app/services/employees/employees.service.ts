import { HttpClient } from '@angular/common/http';
import {
  Inject,
  Injectable,
} from '@angular/core';
import {
  Observable,
  catchError,
  map,
  of,
  tap,
} from 'rxjs';
import { IBackendReponse } from 'src/app/services/auth/auth.service';
import { environment } from 'src/app/env/environment';
import { Role } from 'src/app/components/user-credential-form/user-credential-form.component';

export interface IEmployee {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: Role;
  position: string;
  daysoff: number;
  status: number;
  superior: ISuperior;
}

export interface ISuperior {
  id: string;
  name: string;
  surname: string;
  email: string;
  area: string;
  position: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(
    private http: HttpClient,
    @Inject('LocalEnv')
    private env: typeof environment
  ) { }

  getEmployees(): Observable<IEmployee[]> {
    return this.http
      .get<IBackendReponse<IEmployee[]>>(
        `${this.env.apiUrl}/api/employee/all`,
        {
          headers: {
            Authorization:
              'Bearer ' +
              sessionStorage.getItem('token'),
          },
        }
      )
      .pipe(
        catchError(() => {
          return of({
            error: true,
            code: 401,
            message: 'Unauthorized',
            data: [],
          });
        }),
        map((res) => {
          return res.data;
        })
      );
  }

  getEmployeeById(
    id: string
  ): Observable<IEmployee | null> {
    const url =
      this.env.apiUrl + '/api/employee/' + id;
    return this.http
      .get<IBackendReponse<IEmployee>>(url, {
        headers: {
          Authorization:
            'Bearer ' +
            sessionStorage.getItem('token'),
        },
      })
      .pipe(
        catchError((err) => {
          return of({
            error: true,
            code: 401,
            message: 'Unauthorized',
            data: null,
          });
        }),
        map((res) => {
          return res.data;
        })
      );
  }
  deleteEmployee(
    id: string
  ): Observable<IBackendReponse<string>> {
    const url =
      this.env.apiUrl + '/api/employee/' + id;
    return this.http.delete<
      IBackendReponse<string>
    >(url, {
      headers: {
        Authorization:
          'Bearer ' +
          sessionStorage.getItem('token'),
      },
    });
  }
  updateEmployeeData(employeeData: IEmployee) {
    const url =
      this.env.apiUrl +
      '/api/employee/update' +
      employeeData.id;
    return this.http
      .put<IBackendReponse<string>>(url, employeeData, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .pipe(
        catchError((err) => {
          return of(err);
        })
      );
  }
  findEmployees(phrase: string): Observable<IBackendReponse<IEmployee[]>> {
    const url =
      this.env.apiUrl +
      '/api/employee/find-by/' +
      phrase;
    return this.http.get<IBackendReponse<IEmployee[]>>(url, {
      headers: {
        Authorization:
          'Bearer ' +
          sessionStorage.getItem('token'),
      },
    }).pipe(
      catchError((err) => {
        const res: IBackendReponse<IEmployee[]> = {
          data: [],
          code: 0,
          error: true,
          message: err.message
        };
        return of(res);
      })
    );
  }
}
