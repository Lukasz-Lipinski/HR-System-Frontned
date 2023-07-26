import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
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
} from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';

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
  private registrationFormEmitter =
    new EventEmitter<IAdminCredential>();
  get getRegistrationFormEmitter() {
    return this.registrationFormEmitter;
  }
  private authService = inject(AuthService);
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
          this.CheckEmailAsyncValidator,
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
    this.registrationFormEmitter.emit();
  }
  setError(label: string): string | undefined {
    const errors =
      this.registrationForm.controls[
        label as keyof IRegistrationForm
      ].errors;

    if (!errors) {
      return undefined;
    }

    const error = Object.keys(errors)[0];
    return this.findError(error);
  }

  private findError(error: string) {
    switch (error) {
      case 'required':
        return 'This field is required';
      case 'pattern':
        return 'Address email is incorrect';
      case 'minlength':
        return 'Passed text is too short';
      case 'isInRegistered':
        return 'Assigned email already exsists';
      default:
        return '';
    }
  }
  private CheckEmailAsyncValidator: AsyncValidatorFn =
    (
      control: AbstractControl
    ): Observable<ValidationErrors | null> => {
      return this.authService.CheckEmail(
        control.value
      );
    };
}
