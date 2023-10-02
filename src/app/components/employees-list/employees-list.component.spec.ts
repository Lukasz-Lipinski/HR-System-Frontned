import {
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { EmployeesListComponent } from './employees-list.component';
import { ChangeDetectorRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { mockedEmployees } from 'src/app/mocks/mocks';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { By } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Testing EmployeesList Component', () => {
  let fixture: ComponentFixture<EmployeesListComponent>;
  let component: EmployeesListComponent;
  let cdr: ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesListComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      EmployeesListComponent
    );
    component = fixture.componentInstance;
    cdr = fixture.debugElement.injector.get(
      ChangeDetectorRef
    );
    component.employees = mockedEmployees;
    component.ngOnInit();
    cdr.detectChanges();
  });

  describe('Class Tests', () => {
    it('Should displayed displayedColumns props', () => {
      expect(
        component.displayedColumns.length
      ).toEqual(8);
      const wholeColumns =
        component.displayedColumns.join(' ');
      for (
        let i = 0;
        i < component.displayedColumns.length;
        i++
      ) {
        expect(wholeColumns).toContain(
          component.displayedColumns[i]
        );
      }
    });
    it("Should got assgned 'employees' property", () => {
      for (
        let i = 0;
        i < mockedEmployees.length;
        i++
      ) {
        expect(component.employees[i].id).toEqual(
          mockedEmployees[i].id
        );
        expect(
          component.employees[i].name
        ).toEqual(mockedEmployees[i].name);
        expect(
          component.employees[i].surname
        ).toEqual(mockedEmployees[i].surname);
        expect(
          component.employees[i].email
        ).toEqual(mockedEmployees[i].email);
        expect(
          component.employees[i].role
        ).toEqual(mockedEmployees[i].role);
        expect(
          component.employees[i].position
        ).toEqual(mockedEmployees[i].position);
        expect(
          component.employees[i].daysoff
        ).toEqual(mockedEmployees[i].daysoff);
        expect(
          component.employees[i].status
        ).toEqual(mockedEmployees[i].status);
        expect(
          component.employees[i].superior
        ).toBe(mockedEmployees[i].superior);
      }
    });
    it('Should invoked router.navigate in case of an editEmployee usage', inject(
      [Router, ActivatedRoute],
      (
        router: Router,
        activatedRoute: ActivatedRoute
      ) => {
        const spyOnRouter = spyOn(
          router,
          'navigate'
        );
        component.onEditEmployee(mockedEmployees[0].id);
        expect(spyOnRouter).toHaveBeenCalled();
      }
    ));
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeTruthy();
    });
    it('Should displayed Info template if passed data is not null', () => {
      let tab = fixture.debugElement.query(
        By.css('[role="table"]')
      );
      expect(tab).toBeTruthy();
      component.employees = [];
      cdr.detectChanges();
      tab = fixture.debugElement.query(
        By.css('[role="table"]')
      );
      const textInfo = (
        fixture.nativeElement as HTMLElement
      ).querySelector('p');
      expect(textInfo).toBeTruthy();
      expect(
        textInfo!.textContent
          ?.trim()
          .toLowerCase()
      ).toEqual('not employees are found');
      expect(tab).toBeFalsy();
    });
    it("Should dispalyed paginator", () => {
      const paginator = fixture.debugElement.query(By.directive(MatPaginator)).nativeElement;
      expect(paginator).toBeTruthy();
    })
  });
});
