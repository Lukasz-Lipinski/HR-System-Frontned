import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export interface IAccountForm {
  email: FormControl<string>;
  name: FormControl<string>;
  surname: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

export interface IAccountFormField {
  name: string;
  placeholder: string;
  type: 'text' | 'password' | 'email';
  icon?: string;
}

export function identicalPasswords(
  control: AbstractControl
): ValidatorFn {
  return (
    controlToCheck: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = controlToCheck.get(
      'confirmPassword'
    );
    console.log(
      '🚀 ~ file: account-form.component.ts:38 ~ password:',
      password?.value
    );
    console.log(
      '🚀 ~ file: account-form.component.ts:41 ~ confirmPassword:',
      confirmPassword?.value
    );

    if (password && confirmPassword) {
      if (
        password.value !== confirmPassword.value
      ) {
        return {
          identicalPasswords: true,
        };
      }
    }

    return null;
  };
}

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFormComponent {
  private accountForm!: FormGroup<IAccountForm>;
  get getAccountForm(): FormGroup<IAccountForm> {
    return this.accountForm;
  }
  private isVisible: WritableSignal<boolean> =
    signal<boolean>(false);
  get getIsVisible(): boolean {
    return this.isVisible();
  }
  private accountFormFields: IAccountFormField[] =
    [
      {
        name: 'email',
        placeholder: 'Assign your email address',
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
  get getAccountFormFields(): IAccountFormField[] {
    return this.accountFormFields;
  }

  constructor() {}

  ngOnInit(): void {
    this.accountForm =
      new FormGroup<IAccountForm>({
        email: new FormControl<string>('', {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.email,
          ],
        }),
        name: new FormControl<string>('', {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.minLength(4),
          ],
        }),
        surname: new FormControl<string>('', {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.minLength(4),
          ],
        }),
        password: new FormControl<string>('', {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.minLength(6),
          ],
        }),
        confirmPassword: new FormControl<string>(
          '',
          {
            nonNullable: true,
            validators: [
              Validators.required,
              Validators.minLength(6),
            ],
          }
        ),
      });
    this.accountForm.controls[
      'confirmPassword'
    ].addValidators(
      identicalPasswords(
        this.accountForm.controls['password']
      )
    );
  }

  onToggleVisibility() {
    this.isVisible.set(!this.isVisible());
  }
  setLabel(label: string): string {
    return label[0]
      .toUpperCase()
      .concat(label.slice(1));
  }
  setErrorMessage(
    name: string
  ): string | undefined {
    const length =
      name.includes('password') ||
      name.includes('confirmPassword')
        ? 6
        : 4;
    const errors =
      this.accountForm.controls[
        name as keyof IAccountForm
      ].errors;

    if (!errors) {
      return undefined;
    }

    const error = Object.keys(errors)[0];

    return this.findError(error, length);
  }
  private findError(
    error: string,
    length: number
  ) {
    switch (error) {
      case 'required':
        return 'This field is required';
      case 'minlength':
        return `Minimum length must be ${length}`;
      case 'email':
        return 'Invalid email address';
      case 'identicalPasswords':
        return 'Passwords do not match';
      default:
        return;
    }
  }
}
