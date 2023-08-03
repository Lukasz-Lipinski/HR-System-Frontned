import {
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import {
  AuthService,
  IAdminCredential,
  IBodyRequestRegister,
} from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  mockedAdminCredential,
  mockedBackendResponse,
  mockedBodyRequestLogin,
  mockedEnvironment,
} from '../../mocks/mocks';
import { signal } from '@angular/core';

describe('Testing AuthService', () => {
  let service: AuthService;
  let testingController: HttpTestingController;
  const mockedUrl =
    mockedEnvironment.apiUrl + '/api/admin';

  const mockedNewUserCredential: IBodyRequestRegister =
    {
      email: 'example@example.com',
      password: 'password123',
      name: 'John',
      surname: 'Doe',
    };

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
    service.adminCredentialSignal = signal(
      mockedAdminCredential
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
    const req = testingController.expectOne(
      mockedUrl + '/login'
    );
    req.flush(mockedBackendResponse);
    tick();
  }));
  it('Should register user and send user credentials in return', fakeAsync(() => {
    service
      .Register(mockedNewUserCredential)
      .subscribe({
        next: (res) => {
          expect(res.data).toBe(
            mockedAdminCredential
          );
          for (
            let i = 0;
            i < Object.values(res.data).length;
            i++
          ) {
            expect(
              Object.values(res.data)[i]
            ).toEqual(
              Object.values(
                mockedAdminCredential
              )[i]
            );
          }
          tick();
        },
      });

    testingController
      .expectOne(mockedUrl + '/register')
      .flush({
        data: mockedAdminCredential,
      });
    tick();
  }));
  it('Should returned admin credential', fakeAsync(() => {
    service.GetAdminCred().subscribe({
      next: (cred) => {
        expect(cred).toBeDefined();
        const credential = Object.values(cred!);
        for (
          let i = 0;
          i < credential.length;
          i++
        ) {
          expect(credential[i]).toEqual(
            Object.values(mockedAdminCredential)[
              i
            ]
          );
          tick();
        }
      },
    });

    testingController
      .expectOne(mockedUrl)
      .flush({ data: mockedAdminCredential });
    tick();
  }));
  it('Should checked password async and returned true if is correct', fakeAsync(() => {
    service
      .CheckPassword('test hashed password')
      .subscribe({
        next: (res) => {
          expect(res).toBeTrue();
          tick();
        },
      });

    testingController
      .expectOne(mockedUrl + '/check-password')
      .flush({ data: true });
    tick();
  }));
  it("Should checked password async and returned false if isn't correct", fakeAsync(() => {
    service
      .CheckPassword('incorrect password')
      .subscribe({
        next: (err) => {
          expect(err).toBeFalse();
          tick();
        },
      });

    testingController
      .expectOne(mockedUrl + '/check-password')
      .error(new ProgressEvent(''), {
        status: 404,
        statusText: 'Invalid password',
      });
    tick();
  }));
  it('Should changed admin credential', fakeAsync(() => {
    const newAdminCred: IAdminCredential = {
      email: 'admin@example.com',
      name: 'admin',
      surname: 'admin',
      token: '',
    };
    service
      .ChangeAdminCredential(newAdminCred)
      .subscribe({
        next: (res) => {
          expect(res.data).toEqual('success');
          tick();
        },
      });

    testingController
      .expectOne(
        mockedUrl + '/update-credentials'
      )
      .flush({
        data: 'success',
      });
    tick();
  }));
  it('Should responded with error', fakeAsync(() => {
    const newAdminCred: IAdminCredential = {
      email: 'admin@example.com',
      name: 'admin',
      surname: 'admin',
      token: '',
    };
    service
      .ChangeAdminCredential(newAdminCred)
      .subscribe({
        next: (res) => {
          expect(res.data).toEqual(
            'Invalid data'
          );
          tick();
        },
      });
    testingController
      .expectOne(
        mockedUrl + '/update-credentials'
      )
      .error(new ProgressEvent(''), {
        status: 404,
        statusText: 'Invalid data',
      });
    tick();
  }));
});
