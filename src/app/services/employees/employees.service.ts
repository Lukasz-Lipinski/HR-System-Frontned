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
import { IBackendReponse } from 'src/app/auth/auth.service';

export interface IEmployee {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: number;
  position: string;
  daysoff: number;
  status: number;
  superior: ISuperior;
}

export interface ISuperior {
  name: string;
  surname: string;
  email: string;
  area: string;
  position: string;
}

const mockedEmployees: IEmployee[] = [
  {
    id: 'alsgjogajoj',
    name: 'John',
    surname: 'Doe',
    email: 'johndoe@example.com',
    role: 1,
    position: 'Software Engineer',
    daysoff: 2,
    status: 1,
    superior: {
      name: 'Jane',
      surname: 'Doe',
      email: 'janedoe@example.com',
      area: 'Sales',
      position: 'Manager',
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(
    private http: HttpClient,
    @Inject('LocalEnv') private env: any
  ) {}

  getEmployees(): Observable<IEmployee[]> {
    return this.http
      .get<IBackendReponse<IEmployee[]>>(
        `${this.env.apiUrl}/api/Employee/all`,
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
            data: mockedEmployees,
          });
        }),
        map((res) => {
          return res.data ? res.data : [];
        })
      );
  }

  getEmployeeById(
    id: string
  ): Observable<IEmployee | null> {
    const url =
      this.env.apiUrl + '/api/Employee/' + id;
    return this.http
      .get<IBackendReponse<IEmployee>>(url, {
        headers: {
          Authorization:
            'Bearer' +
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
      this.env.apiUrl + '/api/Employee/' + id;
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
}
