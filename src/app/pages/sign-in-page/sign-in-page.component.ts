import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  signal,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  standalone: true,
  imports: [SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPageComponent {
  constructor(
    private snackbarModule: MatSnackBar
  ) {}

  setError(msg: string) {
    this.snackbarModule.open(msg, 'Close', {
      duration: 3000,
    });
  }
}
