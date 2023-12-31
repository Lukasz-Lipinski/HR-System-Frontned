import { HttpClient } from '@angular/common/http';
import {
  Inject,
  Injectable,
  OnInit,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
  timeout,
} from 'rxjs';
import { environment } from '../../env/environment';
import { ValidationErrors } from '@angular/forms';

export interface IBodyRequestLogin {
  email: string;
  password: string;
}

export interface IBodyRequestRegister
  extends IBodyRequestLogin {
  name: string;
  surname: string;
}

export interface IAdminCredential {
  name: string;
  surname: string;
  email: string;
  token: string;
}

export interface IBackendReponse<T> {
  code: number;
  data: T;
  error: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  adminCredential: BehaviorSubject<
    IAdminCredential | undefined
  > = new BehaviorSubject<
    IAdminCredential | undefined
  >(undefined);
  adminCredentialSignal = toSignal(
    this.adminCredential
  );

  constructor(
    private http: HttpClient,
    @Inject('LocalEnv')
    private env: typeof environment
  ) {}

  ngOnInit(): void {}

  Login(
    userCred: IBodyRequestLogin
  ): Observable<
    IBackendReponse<IAdminCredential>
  > {
    return this.http
      .post<IBackendReponse<IAdminCredential>>(
        `${this.env.apiUrl}/api/admin/login`,
        userCred
      )
      .pipe(
        tap((res) => {
          console.log(
            '🚀 ~ file: auth.service.ts:78 ~ AuthService ~ tap ~ res:',
            res
          );
          if (res.data) {
            this.adminCredential.next(res.data);
            sessionStorage.setItem(
              'token',
              res.data.token
            );
          }
        })
      );
  }

  Register(
    userCred: IBodyRequestRegister
  ): Observable<
    IBackendReponse<IAdminCredential | string>
  > {
    return this.http
      .post<
        IBackendReponse<IAdminCredential | string>
      >(
        `${this.env.apiUrl}/api/admin/register`,
        userCred
      )
      .pipe(
        catchError((err) => {
          const res: IBackendReponse<string> = {
            data: err.message,
            error: true,
            code: err.code,
            message: err.message,
          };

          return of(res);
        })
      );
  }

  GetAdminCred(): Observable<
    IAdminCredential | undefined
  > {
    return this.http
      .get<IBackendReponse<IAdminCredential>>(
        `${this.env.apiUrl}/api/admin`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem(
              'token'
            )}`,
          },
        }
      )
      .pipe(
        map((res) => {
          this.adminCredential.next(res.data);
          return res.data;
        })
      );
  }

  CheckPassword(
    password: string
  ): Observable<boolean> {
    const url = `${this.env.apiUrl}/api/admin/check-password`;
    return this.http
      .post<IBackendReponse<boolean>>(
        url,
        {
          email:
            this.adminCredentialSignal()!.email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem(
              'token'
            )}`,
          },
        }
      )
      .pipe(
        timeout(2000),
        catchError((err) => {
          const res: IBackendReponse<boolean> = {
            code: err.status,
            data: false,
            error: true,
            message: err.statusText,
          };
          return of(res);
        }),
        map((state) => state.data)
      );
  }

  ChangeAdminCredential(
    adminCred: IAdminCredential
  ): Observable<IBackendReponse<string>> {
    const url =
      this.env.apiUrl +
      '/api/admin/update-credentials';
    return this.http
      .put<IBackendReponse<string>>(
        url,
        adminCred,
        {
          headers: {
            Authorization:
              'Bearer ' +
              sessionStorage.getItem('token'),
          },
        }
      )
      .pipe(
        catchError((err) =>
          of({
            error: true,
            data: 'Invalid data',
          } as IBackendReponse<string>)
        ),
        map((res) => res)
      );
  }

  ChangePassword(
    password: string
  ): Observable<IBackendReponse<string>> {
    const url =
      this.env.apiUrl +
      '/api/admin/update-password';
    return this.http
      .put<IBackendReponse<string>>(
        url,
        { Password: password },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' +
              sessionStorage.getItem('token'),
          },
        }
      )
      .pipe(
        catchError((err) =>
          of({
            data: err.message,
          } as IBackendReponse<string>)
        )
      );
  }

  CheckEmployeeEmail(
    employeeEmail: string
  ): Observable<ValidationErrors | null> {
    return this.http
      .post<IBackendReponse<boolean>>(
        this.env.apiUrl +
          '/api/employees/check-email',
        {
          Email: employeeEmail,
        },
        {
          headers: {
            Authorization:
              'Bearer ' +
              sessionStorage.getItem('token'),
          },
        }
      )
      .pipe(
        catchError((err) => {
          const res: IBackendReponse<boolean> = {
            code: 0,
            data: true,
            error: true,
            message: '',
          };
          return of(res);
        }),
        map((res) =>
          res.error
            ? { isInRegistered: true }
            : null
        )
      );
  }

  CheckEmail(
    email: string
  ): Observable<ValidationErrors | null> {
    const url =
      this.env.apiUrl + '/api/admin/check-email';

    return this.http
      .post<IBackendReponse<boolean>>(
        url,
        {
          Email: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        catchError((err) => {
          const res: IBackendReponse<boolean> = {
            code: err.code,
            error: err.message,
            message: err.message,
            data: true,
          };

          return of(res);
        }),
        map((res) => {
          return res.data
            ? { isInRegistered: true }
            : null;
        })
      );
  }

  Logout() {}
}
