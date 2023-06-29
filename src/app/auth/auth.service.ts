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

export interface IBodyRequest {
  email: string;
  password: string;
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
  adminCredential: BehaviorSubject<AdminCredential> =
    new BehaviorSubject<AdminCredential>({
      email: '',
      name: '',
      surname: '',
      token: '',
    });

  constructor(
    private http: HttpClient,
    @Inject('LocalEnv') private environment: any
  ) {}

  Login(
    userCred: IBodyRequest
  ): Observable<IBackendReponse> {
    return this.http
      .post<IBackendReponse>(
        `${this.environment.apiUrl}/api/Admin/login`,
        userCred
      )
      .pipe(
        tap((res) => {
          if (res.data)
            this.adminCredential.next(res.data);
        })
      );
  }
}
