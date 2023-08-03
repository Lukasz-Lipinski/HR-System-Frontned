import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AuthService,
  IAdminCredential,
} from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  imports: [SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AccountPageComponent {
  private authService: AuthService =
    inject(AuthService);
  private snackbar: MatSnackBar =
    inject(MatSnackBar);
  private isLoadingState = signal<boolean>(false);
  get getIsLoading() {
    return this.isLoadingState;
  }

  constructor() {}

  onSubmit(adminCredentials: IAdminCredential) {
    this.authService
      .ChangeAdminCredential(adminCredentials)
      .subscribe({
        next: (res) => {
          this.snackbar.open(res.data, 'Close', {
            duration: 3000,
            panelClass: res.error
              ? ['error-snackbar']
              : '',
          });
        },
      });
  }
  onSetNewPassword(newPassword: string) {
    this.isLoadingState.set(true);
    this.authService
      .ChangePassword(newPassword)
      .subscribe({
        next: (res) => {
          this.isLoadingState.set(false);
          this.snackbar.open(res.data, 'Close', {
            duration: 3000,
            panelClass: res.error
              ? ['error-snackbar']
              : '',
          });
        },
      });
  }
}
