import { HttpClient } from '@angular/common/http';
import {
  Inject,
  Injectable,
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
export class AuthService {
  adminCredential: BehaviorSubject<
    AdminCredential | undefined
  > = new BehaviorSubject<
    AdminCredential | undefined
  >(undefined);

  constructor(
    private http: HttpClient,
    @Inject('LocalEnv') private environment: any
  ) {}

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
}