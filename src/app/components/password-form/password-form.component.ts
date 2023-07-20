import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

interface IPasswordForm {
  newPassword: FormControl<string>;
  confirmPasswordNewPassword: FormControl<string>;
  confirmPassword: FormControl<string>;
}

// function AsyncPasswordValidator(): AsyncValidatorFn {
//   return (
//     control: AbstractControl
//   ): Promise<ValidationErrors | null> => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (
//           control.value ===
//           control.root.get('confirmPassword')
//             .value
//         ) {
//           resolve(null);
//         } else {
//           resolve({ confirmPassword: true });
//         }
//       }, 1000);
//     });
//   };
// }

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFormComponent {
  private passwordForm!: FormGroup<IPasswordForm>;
  get getPasswordForm(): typeof this.passwordForm {
    return this.passwordForm;
  }

  ngOnInit(): void {
    this.passwordForm =
      new FormGroup<IPasswordForm>({
        newPassword: new FormControl<string>('', {
          validators: [
            Validators.required,
            Validators.minLength(6),
          ],
          updateOn: 'change',
          nonNullable: true,
        }),
        confirmPasswordNewPassword:
          new FormControl<string>('', {
            validators: [
              Validators.required,
              Validators.minLength(6),
            ],
            updateOn: 'change',
            nonNullable: true,
          }),
        confirmPassword: new FormControl<string>(
          '',
          {
            asyncValidators: [],
            nonNullable: true,
            updateOn: 'blur',
          }
        ),
      });
  }
}
