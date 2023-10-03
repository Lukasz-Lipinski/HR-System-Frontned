import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordFormComponent } from './password-form.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ValidatorsService } from 'src/app/services/validators/validators.service';
import { mockedEnvironment } from 'src/app/mocks/mocks';
import { AuthService } from 'src/app/services/auth/auth.service';
import { By } from '@angular/platform-browser';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LabelComponent } from './label/label.component';

describe('Testing PasswordFormComponent', () => {
  let component: PasswordFormComponent;
  let fixture: ComponentFixture<PasswordFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordFormComponent],
      imports: [SharedModule, BrowserAnimationsModule],
      providers: [
        {
          provide: ValidatorsService,
          useValue: {
            MatchPasswordValidator: () => null,
            CheckPasswordAsyncValidator: () => of(null),
            findError: () => {},
          },
        },
        AuthService,
        {
          provide: 'LocalEnv',
          useValue: mockedEnvironment,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PasswordFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  describe('DOM tests', () => {
    it('Should created', () => {
      expect(component).toBeTruthy();
    });
    it('Should rendered form', () => {
      const form = fixture.debugElement.query(By.css('form'))
        ?.nativeElement as HTMLFormElement;
      expect(form).toBeTruthy();
      expect(form.className).toContain('form-shape form-gap');
    });
    it('Should exaclty rendered 3 fields', () => {
      const fields = fixture.debugElement.queryAll(By.css('input'));
      expect(fields.length).toEqual(3);
      expect(fields[0].nativeElement.placeholder).toEqual('Old Password');
      expect(fields[1].nativeElement.placeholder).toEqual('New Password');
      expect(fields[2].nativeElement.placeholder).toEqual(
        'Confirm New Password'
      );
      expect(fields[0].nativeElement.type).toEqual('password');
      expect(fields[1].nativeElement.type).toEqual('password');
      expect(fields[2].nativeElement.type).toEqual('password');
      expect(fields[0].nativeElement.name).toEqual('oldPassword');
      expect(fields[1].nativeElement.name).toEqual('newPassword');
      expect(fields[2].nativeElement.name).toEqual('confirmNewPassword');
      expect(fields[0].nativeElement.className).toContain('form-input-shape');
    });
    it("Should rendered 'Change Password' button", () => {
      const button = fixture.debugElement.query(By.css('button'))
        ?.nativeElement as HTMLButtonElement;
      expect(button).toBeTruthy();
      expect(button.className).toContain('btn-shape');
      expect(button.textContent).toEqual('Change Password');
    });

    it('Should rendered labels', () => {
      const labels = fixture.debugElement.queryAll(
        By.directive(LabelComponent)
      );
      expect(labels.length).toEqual(3);

      for (let i = 0; i < labels.length; i++) {
        const label = labels[i].nativeElement as HTMLLabelElement;
        expect(label.textContent).toBeInstanceOf(String);
        expect(label.textContent).toBeTruthy();
      }
    });
  });
  describe('Class tests', () => {
    it('should emit password', () => {
      const mockedPassword = 'XXXXXXXX';
      const spy = spyOn(component.passwordEmitter, 'emit');
      component.getPasswordForm.controls['newPassword'].setValue(
        mockedPassword
      );
      component.getPasswordForm.controls['confirmNewPassword'].setValue(
        mockedPassword
      );
      component.getPasswordForm.controls['newPassword'].markAsTouched();
      component.getPasswordForm.controls['confirmNewPassword'].markAsTouched();
      component.getPasswordForm.controls['oldPassword'].setValue('testtest');
      component.getPasswordForm.controls['oldPassword'].markAsTouched();
      component.onSubmit();
      console.log(component.getPasswordForm.valid);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(mockedPassword);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('Should showed spinner if input was swapped on true', () => {
      let spinner = fixture.debugElement.query(
        By.directive(MatProgressSpinner)
      )?.nativeElement;
      expect(spinner).toBeFalsy();

      component.isLoading.set(true);
      fixture.detectChanges();
      spinner = fixture.debugElement.query(
        By.directive(MatProgressSpinner)
      ).nativeElement;
      expect(spinner).toBeTruthy();
    });
    it('Should initialized form with empty values', () => {
      expect(component.getPasswordForm.value).toEqual({
        confirmNewPassword: '',
        newPassword: '',
        oldPassword: '',
      });
    });
    it('Should returned fields array', () => {
      expect(component.getFields.length).toEqual(3);
    });
    it('Should disable button dependently on form validity', () => {
      expect(component.buttonDisabled()).toBeTruthy();
      component.getPasswordForm.controls['oldPassword'].setValue('testtest24');
      component.getPasswordForm.controls['oldPassword'].markAsTouched();
      component.getPasswordForm.controls['newPassword'].setValue('testtest');
      component.getPasswordForm.controls['confirmNewPassword'].setValue(
        'testtest'
      );
      component.getPasswordForm.controls['newPassword'].markAsTouched();
      component.getPasswordForm.controls['confirmNewPassword'].markAsTouched();
      component.getPasswordForm.controls['newPassword'].markAsDirty();
      component.getPasswordForm.controls['confirmNewPassword'].markAsDirty();
      fixture.detectChanges();
      expect(component.buttonDisabled()).toBeFalsy();
    });
  });
});
