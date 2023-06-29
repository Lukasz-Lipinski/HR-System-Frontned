import {
  ComponentFixture,
  TestBed,
  fakeAsync,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  ISigninForm,
  SigninFormComponent,
} from './signin-form.component';
import { AuthService } from 'src/app/auth/auth.service';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Testing SigninFormComponent', () => {
  let fixture: ComponentFixture<SigninFormComponent>;
  let component: SigninFormComponent;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninFormComponent],
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: 'LocalEnv',
          useValue: {
            apiUrl: 'testHost',
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(
      SigninFormComponent
    );
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);

    component.ngOnInit();
  });

  describe('Class Tests', () => {
    it('Should initialized a form', () => {
      expect(
        component.GetSigninForm
      ).toBeTruthy();
    });
    it('Should returned controls', () => {
      for (let control of component.GetSigninFormControls) {
        expect(control.name).toBeTruthy();
        expect(
          typeof control.name
        ).toBeInstanceOf(String);
        expect(control.label).toBeTruthy();
        expect(
          typeof control.label
        ).toBeInstanceOf(String);
        expect(control.placeholder).toBeTruthy();
        expect(
          typeof control.placeholder
        ).toBeInstanceOf(String);
        expect(control.type).toBeTruthy();
        expect(
          typeof control.type
        ).toBeInstanceOf(String);
      }
    });
    it('Should checked if form is valid', () => {
      expect(component.IsFormInvalid).toBeTrue();
      const form =
        component.GetSigninForm.controls;
      for (let control in form) {
        form[
          control as keyof ISigninForm
        ].markAsDirty();
        form[
          control as keyof ISigninForm
        ].markAsTouched();
        form[
          control as keyof ISigninForm
        ].setValue('kaki@fjgkgjo.pl');
      }
      expect(component.IsFormInvalid).toBeFalse();
    });
    it('Should got an appropriate error message', () => {
      const form =
        component.GetSigninFormControls;
      for (let control of form) {
        expect(
          component.getInputError(control.name)
        ).toBeTruthy();
        expect(
          component.getInputError(control.name)
        ).toBeInstanceOf(String);
      }
    });
    it('Should changed isLoading when onSubmit was invoked', () => {
      const mockedEmail = 'test@example.com';
      const mockedPassword = 'testpassword';
      const form =
        component.GetSigninForm.controls;

      form.email.setValue(mockedEmail);
      form.password.setValue(mockedPassword);
      expect(
        component.getLoadingState
      ).toBeFalse();

      component.onSubmit();
      expect(
        component.getLoadingState
      ).toBeTrue();
    });
    it('Should be used Login function when onSubmit was invoked', () => {
      const spyOnAuth = spyOn(
        authService,
        'Login'
      ).and.callThrough();

      const mockedEmail = 'test@example.com';
      const mockedPassword = 'testpassword';
      const form =
        component.GetSigninForm.controls;

      form.email.setValue(mockedEmail);
      form.password.setValue(mockedPassword);

      component.onSubmit();
      expect(spyOnAuth).toHaveBeenCalledTimes(1);
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeTruthy();
    });
    it('Should displayed form tag', () => {
      fixture.detectChanges();
      const form = fixture.debugElement.query(
        By.css('form')
      ).nativeElement as HTMLFormElement;
      expect(form).toBeTruthy();
    });
    it('Should displayed as spinner if getLoadingState equals true', () => {});
  });
});
