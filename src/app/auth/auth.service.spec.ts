import {
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  mockedAdminCredential,
  mockedBackendResponse,
  mockedBodyRequestLogin,
  mockedEnvironment,
} from '../mocks/mocks';
import { tap } from 'rxjs';

describe('Testing AuthService', () => {
  let service: AuthService;
  let testingController: HttpTestingController;
  const mockedUrl =
    mockedEnvironment.apiUrl + '/api/Admin/login';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: 'LocalEnv',
          useValue: mockedEnvironment,
        },
      ],
    });
    service = TestBed.inject(AuthService);
    testingController = TestBed.inject(
      HttpTestingController
    );
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Should used login function and return admin credential', fakeAsync(() => {
    service
      .Login(mockedBodyRequestLogin)
      .subscribe({
        next: (res) => {
          for (let val of Object.values(
            res.data
          )) {
            expect(
              Object.values(
                mockedAdminCredential
              ).includes(val)
            ).toBeTrue();
          }
        },
      });
    var req =
      testingController.expectOne(mockedUrl);
    req.flush(mockedBackendResponse);
    tick();
  }));
});
