import {
  ComponentFixture,
  TestBed,
  fakeAsync,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SigninFormComponent } from './signin-form.component';
import { AuthService } from 'src/app/auth/auth.service';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  mockedEmail,
  mockedInvalidEmail,
  mockedInvalidPassword,
  mockedPassword,
} from 'src/app/mocks/mocks';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('Testing SigninFormComponent', () => {
  let fixture: ComponentFixture<SigninFormComponent>;
  let component: SigninFormComponent;
  let authService: AuthService;
  let spinnerHarness: MatProgressSpinnerHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
    spinnerHarness =
      await TestbedHarnessEnvironment.harnessForFixture(
        fixture,
        MatProgressSpinnerHarness
      );
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
    it('Should checked if form is valid when inputs will be obtained valid data', () => {
      expect(component.IsFormInvalid).toBeTrue();
      const form =
        component.GetSigninForm.controls;
      form.email.setValue(mockedEmail);
      form.password.setValue(mockedPassword);
      expect(component.IsFormInvalid).toBeFalse();
    });
    it('Should got an appropriate error message for fields', () => {
      const form =
        component.GetSigninForm.controls;
      form.email.setValue('');
      //Required condition
      expect(
        component.getInputError('email')
      ).toEqual('This field is required.');

      form.email.setValue(mockedInvalidEmail);
      form.password.setValue(
        mockedInvalidPassword
      );

      //email condition
      expect(
        component.getInputError('email')
      ).toEqual(
        'Please enter a valid email address.'
      );
      //pattern condition
      form.email.setValue('as@fgghw.c.pl.fhg@g');
      expect(
        component.getInputError('email')
      ).toEqual(
        'Please enter a valid email address.'
      );
      //minlength condition
      expect(
        component.getInputError('password')
      ).toEqual(
        'Input length should be greater than 4 characters.'
      );
    });

    it('Should changed isLoading when onSubmit was invoked', () => {
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
    it('Should displayed as spinner if getLoadingState equals true', fakeAsync(() => {
      let spinner = fixture.debugElement.query(
        By.css('mat-spinner')
      );
      expect(spinner).toBeNull();
      component.setLoadingState = true;
      fixture.detectChanges();
      spinner = fixture.debugElement.query(
        By.css('mat-spinner')
      );
      expect(spinner.nativeElement).toBeTruthy();
    }));
  });
});
