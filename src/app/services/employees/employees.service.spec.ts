import {
  TestBed,
  fakeAsync,
  inject,
  tick,
} from '@angular/core/testing';
import {
  EmployeesService,
  IEmployee,
} from './employees.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  mockedEmployees,
  mockedEnvironment,
} from 'src/app/mocks/mocks';

describe('Testing Employee service', () => {
  let controller: HttpTestingController;
  let service: EmployeesService;
  const url =
    mockedEnvironment.apiUrl + '/api/employee';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'LocalEnv',
          useValue: mockedEnvironment,
        },
      ],
    }).compileComponents();
    controller = TestBed.inject(
      HttpTestingController
    );
    service = TestBed.inject(EmployeesService);
  });

  it('Should be created', fakeAsync(() => {
    expect(service).toBeTruthy();
  }));
  it('Should get all employees', fakeAsync(() => {
    service.getEmployees().subscribe((data) => {
      expect(data.length).toEqual(
        mockedEmployees.length
      );
    });
    controller.expectOne(url + '/all').flush({
      data: mockedEmployees,
    });
    tick();
  }));
  it('Should get employee by id', fakeAsync(() => {
    service
      .getEmployeeById('1')
      .subscribe((data) => {
        expect(data).not.toBeNull();
        expect(data!.id).toEqual(
          mockedEmployees[0].id
        );
      });
    controller.expectOne(url + '/1').flush({
      data: mockedEmployees[0],
    });
    tick();
  }));
  it('Should delete employee by id', fakeAsync(() => {}));
  it('Should update employee data', fakeAsync(() => {}));
});
