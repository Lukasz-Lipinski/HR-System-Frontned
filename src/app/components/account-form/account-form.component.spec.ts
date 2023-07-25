import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  AccountFormComponent,
  IAccountForm,
  IAccountFormField,
} from './account-form.component';
import {
  ChangeDetectorRef,
  EventEmitter,
} from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { mockedAdminCredential } from 'src/app/mocks/mocks';
import { FormGroup } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('Testing AccountForm Component', () => {
  let fixture: ComponentFixture<AccountFormComponent>;
  let component: AccountFormComponent;
  let cdr: ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountFormComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        ChangeDetectorRef,
        {
          provide: AuthService,
          useValue: {
            adminCredential: {
              value: mockedAdminCredential,
            },
            checkPassword: () => of(true),
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(
      AccountFormComponent
    );
    component = fixture.componentInstance;
    cdr = fixture.debugElement.injector.get(
      ChangeDetectorRef
    );
    component.ngOnInit();
    cdr.detectChanges();
  });

  describe('Class Tests', () => {
    it('Should created form', fakeAsync(() => {
      expect(
        component.getAccountForm
      ).toBeInstanceOf(FormGroup);
      expect(
        component.getAccountForm
      ).toBeTruthy();
    }));
    it('Should returned isVisible as false initially', () => {
      expect(
        component.getIsVisible()
      ).toBeFalsy();
    });
    it('Should returned form fields accordingly to mocked accountFormFields array', () => {
      const accountFormFields: IAccountFormField[] =
        [
          {
            name: 'email',
            placeholder:
              'Assign your email address',
            type: 'email',
          },
          {
            name: 'name',
            placeholder: 'Assign your name',
            type: 'text',
          },
          {
            name: 'surname',
            placeholder: 'Assign your surname',
            type: 'text',
          },
        ];

      const componentFields =
        component.getAccountFormFields;

      for (
        let i = 0;
        i < accountFormFields.length;
        i++
      ) {
        expect(componentFields[i].name).toEqual(
          accountFormFields[i].name
        );
        expect(
          componentFields[i].placeholder
        ).toEqual(
          accountFormFields[i].placeholder
        );
        expect(componentFields[i].type).toEqual(
          accountFormFields[i].type
        );
        componentFields[i].icon &&
          expect(componentFields[i].icon).toEqual(
            accountFormFields[i].icon
          );
      }
    });
    it('Should switched isVisible to true', () => {
      expect(
        component.getIsVisible()
      ).toBeFalsy();
      component.onToggleVisibility();
      expect(
        component.getIsVisible()
      ).toBeTruthy();
    });
    it('Should returned text with first uppercased letter', () => {
      const text = component.setLabel('test');
      expect(text).toEqual('Test');
    });
    it('Should set error message dependently to control assgiend value. Checking text typed control', () => {
      const errorMsg = () =>
        component.setErrorMessage('name');
      const setValue = (value: string) => {
        component.getAccountForm.controls[
          'name'
        ].setValue(value);
      };
      setValue('');
      expect(errorMsg()).toEqual(
        'This field is required'
      );

      setValue('te');
      expect(errorMsg()).toEqual(
        'Minimum length must be 4'
      );
      setValue('testtesttest');
      expect(errorMsg()).toBeUndefined();
    });
    it('Should set error message dependently to control assgiend value. Checking email typed control', () => {
      const errorMsg = () =>
        component.setErrorMessage('email');
      const setValue = (value: string) => {
        component.getAccountForm.controls[
          'email'
        ].setValue(value);

        setValue('');
        expect(errorMsg()).toEqual(
          'This field is required'
        );
        setValue('testestets');
        expect(errorMsg()).toEqual(
          'Invalid email address'
        );
        setValue('test@example.com');
        expect(errorMsg()).toBeUndefined();
      };
    });
    it('Should set error message dependently to control assgiend value. Checking password typed control', () => {
      const errorMsg = () =>
        component.setErrorMessage('password');
      const setValue = (value: string) => {
        component.getAccountForm.controls[
          'password'
        ].setValue(value);
      };
      setValue('');
      expect(errorMsg()).toEqual(
        'This field is required'
      );
      setValue('passw');
      expect(errorMsg()).toEqual(
        'Minimum length must be 6'
      );
      setValue('test-password');
      expect(errorMsg()).toBeUndefined();
    });
    it('Should set error message dependently to control assgiend value. Checking password confirmation typed control', () => {
      const errorMsg = () =>
        component.setErrorMessage(
          'confirmPassword'
        );
      const setValue = (value: string) => {
        component.getAccountForm.controls[
          'confirmPassword'
        ].setValue(value);
      };

      setValue('');
      expect(errorMsg()).toEqual(
        'This field is required'
      );
      setValue('passw');
      expect(errorMsg()).toEqual(
        'Minimum length must be 6'
      );
      component.getAccountForm.controls[
        'password'
      ].setValue('test-password');
      setValue('test-password-confirmation');
      expect(errorMsg()).toEqual(
        'Passwords do not match'
      );
      setValue('test-password');
      expect(errorMsg()).toBeUndefined();
    });
    it('Should invoked emitter while submitting', () => {
      const spyOnEmitter = spyOn(
        component.formEmitter,
        'emit'
      );

      for (let control in component.getAccountForm
        .controls) {
        component.getAccountForm.controls[
          control as keyof IAccountForm
        ].setValue('test@test.com');
        component.getAccountForm.controls[
          control as keyof IAccountForm
        ].markAsTouched();
        component.getAccountForm.controls[
          control as keyof IAccountForm
        ].markAsDirty();
      }

      component.onSubmit();
      expect(spyOnEmitter).toHaveBeenCalled();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeTruthy();
    });
    it('Should dispalyed form', () => {
      const form = fixture.debugElement.query(
        By.css('form')
      ).nativeElement;
      expect(form).toBeTruthy();
    });
    it('Should displayed all controls', () => {
      const controls =
        fixture.debugElement.queryAll(
          By.css('mat-form-field')
        );
      expect(controls.length).toEqual(
        component.getAccountFormFields.length + 2
      );
    });
    it('Should displayed mat-label elements', () => {
      const labelsText: string[] = [];
      for (let label of component.getAccountFormFields) {
        labelsText.push(
          component.setLabel(label.name)
        );
      }
      labelsText.push('Password');
      labelsText.push('Confirm password');
      const labels =
        fixture.debugElement.queryAll(
          By.css('mat-label')
        );
      expect(labels.length).toEqual(
        component.getAccountFormFields.length + 2
      );
      for (let i = 0; i < labels.length; i++) {
        expect(
          labels[
            i
          ].nativeElement.textContent.trim()
        ).toEqual(labelsText[i]);
      }
    });
    it('Should displayed an icon and clicked should be switched', () => {
      let icon = fixture.debugElement.query(
        By.css('button[mat-icon-button]')
      );
      expect(icon).toBeTruthy();
      expect(
        icon.nativeElement
          .querySelector('mat-icon')
          ?.textContent?.trim()
      ).toEqual('visibility');

      component.onToggleVisibility();
      cdr.detectChanges();

      setTimeout(() => {
        icon = fixture.debugElement.query(
          By.css('button[mat-icon-button]')
        );
        expect(
          icon.nativeElement
            .querySelector('mat-icon')
            ?.textContent?.trim()
        ).toEqual('visibility_off');
      }, 0);
    });
  });
});
