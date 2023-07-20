import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
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
  constructor(private authService: AuthService) {}
  onSubmit(adminCredentials: IAdminCredential) {
    console.log(adminCredentials);
    // this.authService.
  }
}
