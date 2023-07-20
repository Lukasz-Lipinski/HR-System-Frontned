import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthService,
  IBodyRequestLogin,
} from 'src/app/services/auth/auth.service';

export interface ISigninForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface ISigninFormControl {
  name: string;
  type: 'text' | 'number' | 'email' | 'password';
  label: string;
  placeholder: string;
}

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninFormComponent {
  @Output() errorEmitter =
    new EventEmitter<string>();
  private loadingState = signal<boolean>(false);
  get getLoadingState() {
    return this.loadingState();
  }
  set setLoadingState(state: boolean) {
    this.loadingState.set(state);
  }
  private signinForm!: FormGroup<ISigninForm>;
  get GetSigninForm() {
    return this.signinForm;
  }
  private signinFormControls: ISigninFormControl[] =
    [
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Ex: user@example.com',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'example password',
      },
    ];
  get GetSigninFormControls() {
    return this.signinFormControls;
  }
  get IsFormInvalid() {
    return this.signinForm.invalid;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.email,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:pl|com|org|org\.pl|org\.com|com\.pl)$/i
          ),
          Validators.required,
        ],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.minLength(4),
          Validators.required,
        ],
      }),
    });
  }

  getInputError(controlName: string): string {
    const input =
      this.signinForm.controls[
        controlName as keyof ISigninForm
      ];

    for (let error in input.errors) {
      return this.getErrorMessage(error);
    }

    return this.getErrorMessage();
  }

  private getErrorMessage(
    errorType?: string
  ): string {
    switch (errorType) {
      case 'email':
        return 'Please enter a valid email address.';
      case 'pattern':
        return 'Please enter a valid email address.';
      case 'required':
        return 'This field is required.';
      case 'minlength':
        return 'Input length should be greater than 4 characters.';
      default:
        return 'Invalid input.';
    }
  }

  onSubmit() {
    if (this.GetSigninForm.valid) {
      const { email, password } =
        this.signinForm.controls;
      const bodyRequest: IBodyRequestLogin = {
        email: email.value,
        password: password.value,
      };
      this.loadingState.set(true);
      this.authService
        .Login(bodyRequest)
        .subscribe({
          next: () => {
            this.loadingState.set(false);
            this.router.navigate(['dashboard']);
          },
          error: (err: HttpErrorResponse) => {
            this.loadingState.set(false);
            typeof err.error === 'string'
              ? this.errorEmitter.emit(err.error)
              : this.errorEmitter.emit(
                  'Invalid connection. Please try again later'
                );
          },
        });
    }
  }
}
