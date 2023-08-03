import {
  Injectable,
  inject,
} from '@angular/core';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  Observable,
  of,
  switchMap,
  timeout,
} from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  private authService: AuthService =
    inject(AuthService);
  private pattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:pl|com|org|org\.pl|org\.com|com\.pl)$/i;
  get getPattern() {
    return this.pattern;
  }

  findError(error: string, length: number) {
    switch (error) {
      case 'required':
        return 'This field is required';
      case 'minlength':
        return `Minimum length must be ${length}`;
      case 'email':
        return 'Invalid email address';
      case 'pattern':
        return 'Address email is incorrect';
      case 'notIdentical':
        return 'Passwords do not match';
      case 'invalidPassword':
        return 'Invalid password';
      case 'isInRegistered':
        return 'Assigned email already exsists';
      case 'NotMatchPassword':
        return 'Passwords do not match';
      case 'MatchPassword':
        return 'Password matched';
      default:
        return;
    }
  }

  CheckEmailAsyncValidator: AsyncValidatorFn = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    return this.authService.CheckEmail(
      control.value
    );
  };

  CheckEmployeeEmailAsyncValidator: AsyncValidatorFn =
    (
      control: AbstractControl
    ): Observable<ValidationErrors | null> => {
      return this.authService.CheckEmployeeEmail(
        control.value
      );
    };

  MatchPasswordValidator =
    (
      newPasswordControl: AbstractControl
    ): ValidatorFn =>
    (
      control: AbstractControl
    ): ValidationErrors | null => {
      if (
        newPasswordControl.value === control.value
      ) {
        return null;
      }
      return {
        NotMatchPassword: true,
      };
    };

  CheckPasswordAsyncValidator: AsyncValidatorFn =
    (
      control: AbstractControl
    ): Observable<ValidationErrors | null> => {
      return this.authService
        .CheckPassword(control.value)
        .pipe(
          switchMap((res) => {
            return res
              ? of(null)
              : of({
                  NotMatchPassword: true,
                });
          })
        );
    };
}
