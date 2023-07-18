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
import { environment } from '../env/environment';

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
    IBackendReponse<IAdminCredential>
  > {
    return this.http.post<
      IBackendReponse<IAdminCredential>
    >(
      `${this.env.apiUrl}/api/admin/register`,
      userCred
    );
  }

  SetAdminCred() {
    const adminToken =
      sessionStorage.getItem('token');

    if (adminToken) {
      this.http
        .get<IBackendReponse<IAdminCredential>>(
          `${this.env.apiUrl}/api/admin`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
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
