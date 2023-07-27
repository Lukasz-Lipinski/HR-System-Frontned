import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { concatMap, of, switchMap } from 'rxjs';
import {
  AuthService,
  IAdminCredential,
  IBodyRequestLogin,
  IBodyRequestRegister,
} from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-registration-page',
  templateUrl:
    './registration-page.component.html',
  styleUrls: [
    './registration-page.component.scss',
  ],
  standalone: true,
  imports: [SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent {
  private timer!: any;
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackbar = inject(MatSnackBar);
  private isLoadingState = signal<boolean>(false);
  get getIsLoadingState() {
    return this.isLoadingState();
  }

  ngOnInit() {}

  onRegister(adminCred: IBodyRequestRegister) {
    this.isLoadingState.set(true);
    this.authService
      .Register(adminCred)
      .pipe(
        concatMap((res) => {
          this.isLoadingState.set(false);
          this.snackbar.open(
            res.error
              ? (res.data as string)
              : 'Successfully',
            'Close',
            {
              duration: 3000,
            }
          );

          return !res.error
            ? this.authService.Login({
                email: adminCred.email,
                password: adminCred.password,
              } as IBodyRequestLogin)
            : of();
        })
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.timer = setTimeout(() => {
              this.router.navigate(['dashboard']);
            }, 2000);
          }
        },
      });
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}
