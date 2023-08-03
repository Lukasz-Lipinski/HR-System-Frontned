import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupName,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators/validators.service';

export enum Role {
  Employee,
  Manager,
  Trainee,
  Admin,
}

export enum Status {
  Vacation,
  Employed,
  Sick,
}

export interface ISuperior {
  name: string;
  surname: string;
  email: string;
  area: string;
  position: string;
}

export interface IUserCredentialForm {
  name: FormControl<string>;
  surname: FormControl<string>;
  email: FormControl<string>;
  role: FormControl<Role>;
  position: FormControl<string>;
  daysoff: FormControl<number>;
  status: FormControl<Status>;
}

export interface IField {
  type: 'text' | 'email' | 'number';
  name: string;
  label: string;
  placeholder: string;
}

@Component({
  selector: 'app-user-credential-form',
  templateUrl:
    './user-credential-form.component.html',
  styleUrls: [
    './user-credential-form.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCredentialFormComponent
  implements OnInit
{
  private validatorsService = inject(
    ValidatorsService
  );
  private userCredentialForm!: FormGroup<IUserCredentialForm>;
  get getUserCredentialForm() {
    return this.userCredentialForm;
  }
  private fields: IField[] = [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Enter a name',
    },
    {
      type: 'text',
      name: 'surname',
      label: 'Surname',
      placeholder: 'Enter a surname',
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter an email',
    },
    {
      type: 'text',
      name: 'position',
      label: 'Position',
      placeholder: 'Enter a position',
    },
    {
      type: 'number',
      name: 'daysoff',
      label: 'Days off',
      placeholder: 'Enter days off',
    },
  ];
  get getFields() {
    return this.fields;
  }
  blockButton = () =>
    !this.userCredentialForm.valid;

  ngOnInit(): void {
    this.userCredentialForm =
      new FormGroup<IUserCredentialForm>({
        name: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        surname: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        email: new FormControl<string>('', {
          validators: [
            Validators.required,
            Validators.pattern(
              this.validatorsService.getPattern
            ),
          ],
          asyncValidators: [
            this.validatorsService
              .CheckEmailAsyncValidator,
          ],
          nonNullable: true,
          updateOn: 'change',
        }),
        role: new FormControl<Role>(
          Role.Employee,
          {
            validators: [Validators.required],
            nonNullable: true,
          }
        ),
        position: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        daysoff: new FormControl<number>(20, {
          validators: [],
          nonNullable: true,
        }),
        status: new FormControl<Status>(
          Status.Employed,
          {
            validators: [Validators.required],
            nonNullable: true,
          }
        ),
      });
  }

  setErrorMsg(fieldName: string) {
    const errors =
      this.userCredentialForm.controls[
        fieldName as keyof IUserCredentialForm
      ]?.errors;
    if (!errors) {
      return '';
    }
    const error = Object.keys(errors)[0];
    return this.validatorsService.findError(
      error,
      0
    );
  }

  onSubmit() {
    console.log(this.userCredentialForm.valid);
  }
}
