import {
  ComponentFixture,
  TestBed,
  fakeAsync,
} from '@angular/core/testing';
import { MainComponent } from './main.component';
import { By } from '@angular/platform-browser';
import { SearchComponent } from 'src/app/components/search/search.component';
import { EmployeesListComponent } from 'src/app/components/employees-list/employees-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { mockedEmployees } from 'src/app/mocks/mocks';
import { of } from 'rxjs';

describe('Testing Dashboard Main Page', () => {
  let fixture: ComponentFixture<MainComponent>;
  let component: MainComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MainComponent,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              employees: mockedEmployees,
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      MainComponent
    );
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  describe('Class Tests', () => {
    it('Should be obtained data from activated route service', fakeAsync(() => {
      const employees =
        component.getEmployeesSignal();
      expect(employees.length).toEqual(
        mockedEmployees.length
      );
      expect(employees).toBeInstanceOf(Array);

      for (
        let i = 0;
        i < employees.length;
        i += 1
      ) {
        expect(employees[i].id).toEqual(
          mockedEmployees[i].id
        );
        expect(employees[i].name).toEqual(
          mockedEmployees[i].name
        );
        expect(employees[i].surname).toEqual(
          mockedEmployees[i].surname
        );
        expect(employees[i].email).toEqual(
          mockedEmployees[i].email
        );
        expect(employees[i].role).toEqual(
          mockedEmployees[i].role
        );
        expect(employees[i].position).toEqual(
          mockedEmployees[i].position
        );
        expect(employees[i].daysoff).toEqual(
          mockedEmployees[i].daysoff
        );
        expect(employees[i].status).toEqual(
          mockedEmployees[i].status
        );
        expect(employees[i].superior).toEqual(
          mockedEmployees[i].superior
        );
      }
    }));
  });

  describe('DOM Tests', () => {
    it('Should rendered', () => {
      expect(component).toBeTruthy();
    });
    it('Should dispalyed search component', () => {
      const searchComponent =
        fixture.debugElement.query(
          By.directive(SearchComponent)
        );
      expect(searchComponent).toBeTruthy();
    });
    it('Should dispalyed employee list component', () => {
      const employeeListComponent =
        fixture.debugElement.query(
          By.directive(EmployeesListComponent)
        );
      expect(employeeListComponent).toBeTruthy();
    });
  });
});
