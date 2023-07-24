import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
}
