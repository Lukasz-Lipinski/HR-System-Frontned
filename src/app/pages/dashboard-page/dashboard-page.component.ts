import {
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  ActivatedRoute,
  Data,
} from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import {
  AuthService,
  IAdminCredential,
} from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class DashboardPageComponent {}
