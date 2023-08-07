import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { UserCredentialFormComponent } from './user-credential-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import {
  mockedEnvironment,
  mockedSuperiors,
} from 'src/app/mocks/mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ChangeDetectorRef,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  MatError,
  MatFormField,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const setFormOnValid = (form: FormGroup) => {
  for (let control in form.controls) {
    form.controls[control].clearAsyncValidators();
    form.controls[control].clearValidators();
    form.controls[
      control
    ].updateValueAndValidity();
  }
};

describe('UserCredentialFormComponent', () => {
  let component: UserCredentialFormComponent;
  let fixture: ComponentFixture<UserCredentialFormComponent>;
  let cdr: ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCredentialFormComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: 'LocalEnv',
          useValue: mockedEnvironment,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              superiors: {
                data: mockedSuperiors,
              },
            }),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(
      UserCredentialFormComponent
    );
    cdr = fixture.debugElement.injector.get(
      ChangeDetectorRef
    );
    component = fixture.componentInstance;
    component.ngOnInit();
    cdr.detectChanges();
  });

  describe('DOM tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeTruthy();
    });
    it('Should dispalyed form', () => {
      const form = fixture.debugElement.query(
        By.css('form')
      ).nativeElement;
      expect(form).toBeTruthy();
    });
    it('Should displayed submit button', () => {
      const submit = fixture.debugElement.query(
        By.css('button')
      ).nativeElement as HTMLButtonElement;
      expect(submit).toBeTruthy();
      expect(submit.textContent).toContain(
        'Add user'
      );
      expect(submit.disabled).toBeTruthy();
    });
    it('Should displayed submit button', () => {
      setFormOnValid(
        component.getUserCredentialForm
      );
      cdr.detectChanges();
      const submit = fixture.debugElement.query(
        By.css('button')
      ).nativeElement as HTMLButtonElement;
      expect(submit.disabled).toBeFalsy();
    });
    it('Should displayed all labels', () => {
      const labels =
        fixture.debugElement.queryAll(
          By.directive(MatLabel)
        );
      const allText = [
        ...component.getCredentialFields.map(
          (sel) => sel.label
        ),
        ...component.getFields.map(
          (sel) => sel.label
        ),
        component.getDaysoffField.label,
        'Role',
        'Select superior',
      ];
      // 2 was deducted cause of 2 hardcoded fields
      for (let i = 0; i < labels.length; i++) {
        const label = labels[i]
          .nativeElement as HTMLLabelElement;
        expect(label).toBeTruthy();
        expect(label.textContent?.trim()).toEqual(
          allText[i]
        );
      }
    });
    it("Should displayed error msg if field isn't valid", () => {
      //catch element by directive using MatError
      let error = fixture.debugElement.query(
        By.directive(MatError)
      );
      expect(error).toBeFalsy();
      component.getUserCredentialForm.controls[
        'email'
      ].setValue('');
      component.getUserCredentialForm.controls[
        'email'
      ].markAsTouched();
      component.getUserCredentialForm.controls[
        'email'
      ].markAsDirty();
      cdr.detectChanges();
      //catch element by directive using MatError
      error = fixture.debugElement.query(
        By.directive(MatError)
      );
      expect(error).toBeTruthy();
      //expect error to have text content
      expect(
        (
          error.nativeElement as HTMLDivElement
        ).textContent?.trim()
      ).toEqual('This field is required');
    });

    it('Should displayed fields where their total number is equal to 7', () => {
      const fields =
        fixture.debugElement.queryAll(
          By.directive(MatFormField)
        );
      expect(fields.length).toEqual(7);
    });
  });

  describe('Class tests', () => {
    it('Should initialized the form', () => {
      expect(
        component.getUserCredentialForm
      ).toBeTruthy();
    });
    it('Should emitted value if valid', () => {
      const spy = spyOn(
        component.userCredFormEmitter,
        'emit'
      );
      setFormOnValid(
        component.getUserCredentialForm
      );
      component.onSubmit();
      expect(spy).toHaveBeenCalled();
    });
    it('Should returned array with fields', () => {
      expect(component.getFields).toBeTruthy();
      expect(component.getFields.length).toEqual(
        2
      );
    });
    it('Should returned array with credential fields', () => {
      expect(
        component.getCredentialFields
      ).toBeTruthy();
      expect(
        component.getCredentialFields.length
      ).toEqual(2);
    });
    it('Should returned array with roles', () => {
      expect(component.getRoles).toBeTruthy();
      expect(component.getRoles.length).toEqual(
        4
      );
    });
    it('Should returned list of superiors', () => {
      expect(
        component.getSuperiorsList
      ).toBeTruthy();
      expect(
        component.getSuperiorsList.length
      ).toEqual(2);
    });
    it('Should blocked button if form is invalid', () => {
      expect(
        component.blockButton()
      ).toBeTruthy();
    });
    it('Should unblock button if form is valid', () => {
      setFormOnValid(
        component.getUserCredentialForm
      );
      expect(component.blockButton()).toBeFalsy();
    });
    it('Should set error msg accordinly to field name and validation', () => {
      expect(
        component.setErrorMsg('email')
      ).toEqual('This field is required');
    });
  });
});
