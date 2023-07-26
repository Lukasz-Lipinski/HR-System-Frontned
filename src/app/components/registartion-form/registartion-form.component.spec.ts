import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject,
  tick,
} from '@angular/core/testing';
import {
  IRegistrationForm,
  RegistartionFormComponent,
} from './registartion-form.component';
import {
  ChangeDetectorRef,
  EventEmitter,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import {
  mockedAdminCredential,
  mockedEnvironment,
} from 'src/app/mocks/mocks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  MatError,
  MatFormField,
  MatLabel,
} from '@angular/material/form-field';

describe('Testing Registration Form Component', () => {
  let fixture: ComponentFixture<RegistartionFormComponent>;
  let component: RegistartionFormComponent;
  let cdr: ChangeDetectorRef;
  let authService: AuthService;
  let controller: HttpTestingController;

  const setFormValid = (form: FormGroup) => {
    const controls = form.controls;
    for (let fieldName in controls) {
      controls[
        fieldName as keyof IRegistrationForm
      ].markAsDirty();
      controls[
        fieldName as keyof IRegistrationForm
      ].markAsTouched();
      controls[
        fieldName as keyof IRegistrationForm
      ].setValue('test@test.com');
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistartionFormComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: 'LocalEnv',
          useValue: mockedEnvironment,
        },
        AuthService,
        ChangeDetectorRef,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      RegistartionFormComponent
    );
    component = fixture.componentInstance;
    cdr = fixture.debugElement.injector.get(
      ChangeDetectorRef
    );
    controller =
      fixture.debugElement.injector.get(
        HttpTestingController
      );
    authService = TestBed.inject(AuthService);
    component.ngOnInit();
    cdr.detectChanges();
  });

  describe('Class Tests', () => {
    it('Shoud returned registration form', () => {
      expect(
        component.getRegistrationForm
      ).toBeTruthy();
      expect(
        component.getRegistrationForm
      ).toBeInstanceOf(FormGroup);
    });
    it('Should be invalid initially', () => {
      expect(component.isValid).toBeFalse();
    });
    it('Should be valid if all controls contain valid data', fakeAsync(() => {
      setFormValid(component.getRegistrationForm);

      controller
        .expectOne(
          mockedEnvironment.apiUrl +
            '/api/admin/check-email'
        )
        .flush(true);
      tick();
      expect(component.isValid).toBeTruthy();
    }));
    it('Should returned labels', () => {
      for (let label of component.getLabels) {
        expect(label).toBeTruthy();
        expect(label.type).toBeInstanceOf(String);
        expect(label.placeholder).toBeInstanceOf(
          String
        );
        expect(label.name).toBeInstanceOf(String);
        label.icon &&
          expect(label.icon).toBeInstanceOf(
            String
          );
      }
      expect(component.getLabels.length).toEqual(
        4
      );
    });
    it('Should set label with upper case', () => {
      expect(component.setLabel('test')).toEqual(
        'Test'
      );
    });
    it("Should set error accordingly to control's name", () => {
      expect(component.setError('email')).toEqual(
        'This field is required'
      );
    });
    it('Should submitted data', () => {
      const spyOnEmitter = spyOn(
        component.getRegistrationFormEmitter,
        'emit'
      );
      setFormValid(component.getRegistrationForm);

      component.onSubmit();
      expect(spyOnEmitter).toHaveBeenCalled();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeTruthy();
    });
    it('Should displayed form elemet', () => {
      const form = fixture.debugElement.query(
        By.css('form')
      ).nativeElement as HTMLFormElement;
      expect(form).toBeTruthy();
    });
    it('Shoud displayed fields amount equals to number of labels', () => {
      const fields =
        fixture.debugElement.queryAll(
          By.directive(MatFormField)
        );
      const labels =
        fixture.debugElement.queryAll(
          By.directive(MatLabel)
        );
      expect(fields.length).toEqual(
        component.getLabels.length
      );

      for (let i = 0; i < fields.length; i++) {
        const label = labels[i]
          .nativeElement as HTMLLabelElement;

        expect(
          label.textContent?.trim().toLowerCase()
        ).toEqual(component.getLabels[i].name);
      }
    });
    it('Should displayed error message when field is invalid', fakeAsync(() => {
      component.getRegistrationForm.controls[
        'name'
      ].setValue('asd');
      component.getRegistrationForm.controls[
        'name'
      ].markAsDirty();
      component.getRegistrationForm.controls[
        'name'
      ].markAsTouched();

      cdr.detectChanges();
      let errorMessage =
        fixture.debugElement.query(
          By.directive(MatError)
        ).nativeElement;

      expect(errorMessage).toBeTruthy();
      expect(
        errorMessage.textContent?.trim()
      ).toEqual('Passed text is too short');
    }));
  });
});
