import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IAccountFormField } from '../account-form/account-form.component';
import { ValidatorsService } from 'src/app/services/validators/validators.service';
import { IField } from '../user-credential-form/user-credential-form.component';

interface IPasswordForm {
  newPassword: FormControl<string>;
  confirmNewPassword: FormControl<string>;
  oldPassword: FormControl<string>;
}

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFormComponent {
  private validatorsService: ValidatorsService = inject(ValidatorsService);

  @Input({
    required: true,
  })
  isLoading = signal<boolean>(false);

  @Output() passwordEmitter = new EventEmitter<string>();
  private passwordForm = new FormGroup<IPasswordForm>({
    newPassword: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
    confirmNewPassword: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
    oldPassword: new FormControl<string>('', {
      nonNullable: true,
      updateOn: 'change',
    }),
  });
  get getPasswordForm(): typeof this.passwordForm {
    return this.passwordForm;
  }
  private isVisibile = signal<boolean>(false);
  get getIsVisible(): boolean {
    return this.isVisibile();
  }
  set setIsVisibile(value: boolean) {
    this.isVisibile.update((currValue) => !currValue);
  }

  private fields: IAccountFormField[] = [
    {
      name: 'new password',
      placeholder: 'Enter your new password',
      type: 'password',
    },
    {
      name: 'confirm new password',
      placeholder: 'Enter your new password once again',
      type: 'password',
      icon: 'visibility',
    },
    {
      name: 'old password',
      placeholder: 'Enter previous password to confirm your changes',
      type: 'password',
    },
  ];
  get getFields(): IAccountFormField[] {
    return this.fields;
  }
  get isPasswordMatched() {
    return this.passwordForm.controls['oldPassword'].valid;
  }

  ngOnInit() {
    this.getPasswordForm.controls['confirmNewPassword'].addValidators(
      this.validatorsService.MatchPasswordValidator(
        this.getPasswordForm.controls['newPassword']
      )
    );
    this.getPasswordForm.controls['oldPassword'].addAsyncValidators(
      this.validatorsService.CheckPasswordAsyncValidator
    );
  }

  setError(label: string) {
    const control = this.passwordForm.controls[label as keyof IPasswordForm];

    if (!control.errors) {
      return;
    }
    const error = Object.keys(control.errors)[0];
    return this.validatorsService.findError(error, 6);
  }

  onSubmit() {
    this.passwordForm.valid &&
      this.passwordEmitter.emit(
        this.passwordForm.controls['newPassword'].value
      );
  }
  buttonDisabled = () => !this.passwordForm.valid;
  trackByName = (index: number, field: IAccountFormField) => field.name;
}
