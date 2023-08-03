import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import {
  AuthService,
  IAdminCredential,
} from 'src/app/services/auth/auth.service';
import { ValidatorsService } from 'src/app/services/validators/validators.service';

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

function identicalPasswordsValidator(
  passwordControl: AbstractControl
): ValidatorFn {
  return (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = passwordControl.value;
    const confirmPassword = control.value;

    if (password !== confirmPassword) {
      return { notIdentical: true };
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
  private validatorsService = inject(
    ValidatorsService
  );
  @Output() formEmitter =
    new EventEmitter<IAdminCredential>();
  private adminData!: IAdminCredential;
  private accountForm!: FormGroup<IAccountForm>;
  get getAccountForm(): FormGroup<IAccountForm> {
    return this.accountForm;
  }
  private isVisible = signal<boolean>(false);
  get getIsVisible() {
    return this.isVisible.asReadonly();
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
  isFormValid = () => this.accountForm.valid;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.adminData =
      this.authService.adminCredential.value!;
    this.accountForm =
      new FormGroup<IAccountForm>({
        email: new FormControl<string>(
          this.adminData.email,
          {
            nonNullable: true,
            validators: [
              Validators.required,
              Validators.email,
            ],
          }
        ),
        name: new FormControl<string>(
          this.adminData.name,
          {
            nonNullable: true,
            validators: [
              Validators.required,
              Validators.minLength(4),
            ],
          }
        ),
        surname: new FormControl<string>(
          this.adminData.surname,
          {
            nonNullable: true,
            validators: [
              Validators.required,
              Validators.minLength(4),
            ],
          }
        ),
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
            asyncValidators: [
              this.ValidatePasswordOnBackend,
            ],
            updateOn: 'blur',
          }
        ),
      });

    this.accountForm.controls.confirmPassword.addValidators(
      identicalPasswordsValidator(
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

    return this.validatorsService.findError(
      error,
      length
    );
  }

  onSubmit() {
    if (this.isFormValid()) {
      const { email, name, surname } =
        this.accountForm.controls;
      const updatedAdminData: IAdminCredential = {
        email: email.value,
        name: name.value,
        surname: surname.value,
        token: '',
      };
      this.formEmitter.emit(updatedAdminData);
    }
  }

  private ValidatePasswordOnBackend: AsyncValidatorFn =
    (
      control: AbstractControl
    ): Observable<ValidationErrors | null> => {
      return this.authService
        .CheckPassword(control.value)
        .pipe(
          map((res) =>
            res ? null : { invalidPassword: true }
          )
        );
    };
}
