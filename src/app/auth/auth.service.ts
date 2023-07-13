import { HttpClient } from '@angular/common/http';
import {
  Inject,
  Injectable,
  OnInit,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
  tap,
} from 'rxjs';

export interface IBodyRequestLogin {
  email: string;
  password: string;
}

export interface IBodyRequestRegister
  extends IBodyRequestLogin {
  name: string;
  surname: string;
}

export interface AdminCredential {
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
    AdminCredential | undefined
  > = new BehaviorSubject<
    AdminCredential | undefined
  >(undefined);

  constructor(
    private http: HttpClient,
    @Inject('LocalEnv') private environment: any
  ) {}

  ngOnInit(): void {}

  Login(
    userCred: IBodyRequestLogin
  ): Observable<
    IBackendReponse<AdminCredential>
  > {
    return this.http
      .post<IBackendReponse<AdminCredential>>(
        `${this.environment.apiUrl}/api/Admin/login`,
        userCred
      )
      .pipe(
        tap((res) => {
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
    IBackendReponse<AdminCredential>
  > {
    return this.http.post<
      IBackendReponse<AdminCredential>
    >(
      `${this.environment}/Admin/register`,
      userCred
    );
  }

  SetAdminCred() {
    const adminToken =
      sessionStorage.getItem('token');

    if (adminToken) {
      this.http
        .get<IBackendReponse<AdminCredential>>(
          `${this.environment}/Admin`,
          {
            headers: {
              Authorization: `${adminToken}`,
            },
          }
        )
        .subscribe({
          next: (res) => {
            this.adminCredential.next(res.data);
          },
        });
    }
  }

  Logout() {}
}
