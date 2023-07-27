import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { IAccountFormField } from '../account-form/account-form.component';
import {
  AuthService,
  IAdminCredential,
  IBodyRequestRegister,
} from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { ValidatorsService } from 'src/app/services/validators/validators.service';

export interface IRegistrationForm {
  email: FormControl<string>;
  name: FormControl<string>;
  surname: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-registartion-form',
  templateUrl:
    './registartion-form.component.html',
  styleUrls: [
    './registartion-form.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistartionFormComponent {
  private validatorsService = inject(
    ValidatorsService
  );
  @Input({
    required: true,
  })
  isLoading!: boolean;
  @Output() submitEmitter =
    new EventEmitter<IBodyRequestRegister>();
  private registrationForm!: FormGroup<IRegistrationForm>;
  get getRegistrationForm(): FormGroup<IRegistrationForm> {
    return this.registrationForm;
  }
  get isValid() {
    return this.registrationForm.valid;
  }
  private labels: IAccountFormField[] = [
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
    {
      name: 'email',
      placeholder: 'Assign your email address',
      type: 'email',
    },
    {
      name: 'password',
      placeholder: 'Assign your password',
      type: 'password',
    },
  ];
  get getLabels(): IAccountFormField[] {
    return this.labels;
  }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:pl|com|org|org\.pl|org\.com|com\.pl)$/i
          ),
        ],
        asyncValidators: [
          this.validatorsService
            .CheckEmailAsyncValidator,
        ],
        updateOn: 'change',
      }),
      name: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(4),
        ],
      }),
      surname: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(4),
        ],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6),
        ],
      }),
    });
  }

  setLabel = (label: string) =>
    label[0].toUpperCase() +
    label.substring(1, label.length);

  onSubmit() {
    const { email, name, password, surname } =
      this.registrationForm.controls;
    const adminCred: IBodyRequestRegister = {
      email: email.value,
      name: name.value,
      password: password.value,
      surname: surname.value,
    };
    this.submitEmitter.emit(adminCred);
  }
  setError(label: string): string | undefined {
    const errors =
      this.registrationForm.controls[
        label as keyof IRegistrationForm
      ].errors;

    if (!errors) {
      return undefined;
    }

    const len = label === 'password' ? 6 : 4;

    const error = Object.keys(errors)[0];
    return this.validatorsService.findError(
      error,
      len
    );
  }
}
