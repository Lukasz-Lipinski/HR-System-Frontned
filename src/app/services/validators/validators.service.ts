import {
  Injectable,
  inject,
} from '@angular/core';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  private authService: AuthService =
    inject(AuthService);

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
}
