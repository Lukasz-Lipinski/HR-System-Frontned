import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  imports: [SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AccountPageComponent {}
