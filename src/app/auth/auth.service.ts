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
import { mockedAdminCredential } from '../mocks/mocks';

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

export interface IBackendReponse {
  code: number;
  data: AdminCredential;
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

  ngOnInit(): void {
    this.GetAdminCredential();
    console.log(this.adminCredential.getValue());
  }

  Login(
    userCred: IBodyRequestLogin
  ): Observable<IBackendReponse> {
    return this.http
      .post<IBackendReponse>(
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
  ): Observable<IBackendReponse> {
    return this.http.post<IBackendReponse>(
      `${this.environment}/Admin/register`,
      userCred
    );
  }

  private GetAdminCredential() {
    const adminToken =
      sessionStorage.getItem('token');
    const adminCred =
      this.adminCredential.getValue();
    if (adminToken && !adminCred) {
      this.http
        .get<IBackendReponse>(
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
