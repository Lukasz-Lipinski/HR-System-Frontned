import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  Signal,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import {
  IEmployee,
  ISuperior,
} from 'src/app/services/employees/employees.service';
import { ValidatorsService } from 'src/app/services/validators/validators.service';

export enum Role {
  Employee = 'Employee',
  Manager = 'Manager',
  Trainee = 'Trainee',
  Admin = 'Admin',
}

export enum Status {
  Vacation,
  Employed,
  Sick,
}

export interface IUserCredentialForm {
  name: FormControl<string>;
  surname: FormControl<string>;
  email: FormControl<string>;
  role: FormControl<string>;
  position: FormControl<string>;
  daysoff: FormControl<number>;
  status: FormControl<Status>;
  superiors: FormControl<string>;
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
  @Output() userCredFormEmitter =
    new EventEmitter<IEmployee>();
  private validatorsService = inject(
    ValidatorsService
  );
  private activatedRoute = inject(ActivatedRoute);
  private userCredentialForm!: FormGroup<IUserCredentialForm>;
  get getUserCredentialForm() {
    return this.userCredentialForm;
  }
  private credentialFields: IField[] = [
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
  ];
  get getCredentialFields() {
    return this.credentialFields;
  }
  private fields: IField[] = [
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
  ];
  get getFields() {
    return this.fields;
  }
  private daysoffField: IField = {
    type: 'number',
    name: 'daysoff',
    label: 'Days off',
    placeholder: 'Enter days off',
  };
  get getDaysoffField() {
    return this.daysoffField;
  }
  private roles: Role[] = [
    Role.Employee,
    Role.Manager,
    Role.Trainee,
    Role.Admin,
  ];
  get getRoles() {
    return this.roles;
  }
  private superiorsList: Signal<
    ISuperior[] | undefined
  > = toSignal(
    this.activatedRoute.data.pipe(
      map((data) => data['superiors'].data)
    )
  );
  get getSuperiorsList(): ISuperior[] {
    return this.superiorsList() ?? [];
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
        role: new FormControl<Role>(Role.Admin, {
          validators: [Validators.required],
          nonNullable: true,
        }),
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
        superiors: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
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
    const {
      surname,
      daysoff,
      email,
      name,
      position,
      role,
      status,
      superiors,
    } = this.userCredentialForm.controls;

    const employee: IEmployee = {
      id: '',
      name: name.value,
      surname: surname.value,
      email: email.value,
      position: position.value,
      role: Role[role.value as keyof typeof Role],
      daysoff: daysoff.value,
      status: status.value,
      superior:
        this.superiorsList()!.find(
          (s) => s.id === superiors.value
        ) ?? ({} as ISuperior),
    };

    this.userCredentialForm.valid &&
      this.userCredFormEmitter.emit(employee);
  }
}
