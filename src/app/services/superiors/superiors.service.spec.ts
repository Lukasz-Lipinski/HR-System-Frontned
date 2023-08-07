import {
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { SuperiorsService } from './superiors.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  mockedEnvironment,
  mockedSuperiors,
} from 'src/app/mocks/mocks';

describe('SuperiorsService', () => {
  let service: SuperiorsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'LocalEnv',
          useValue: {
            apiUrl: mockedEnvironment,
          },
        },
      ],
    }).compileComponents();
    service = TestBed.inject(SuperiorsService);
    httpController = TestBed.inject(
      HttpTestingController
    );
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should got all superiors', fakeAsync(() => {
    const url =
      mockedEnvironment + '/api/superior/all';
    service
      .getSuperiors()
      .subscribe((superiors) => {
        expect(superiors.data.length).toEqual(
          mockedSuperiors.length
        );
      });
    httpController.expectOne(url).flush({
      data: mockedSuperiors,
    });
    tick();
  }));
  it('Should got error if something went wrong', fakeAsync(() => {
    const url =
      mockedEnvironment + '/api/superior/all';
    service
      .getSuperiors()
      .subscribe((superiors) => {
        expect(superiors.error).toBeTrue();
      });
    httpController
      .expectOne(url)
      .error(new ProgressEvent('error'), {
        status: 404,
        statusText: 'Not found',
      });
    tick();
  }));
});
