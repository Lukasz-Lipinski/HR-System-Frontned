import { Component } from '@angular/core';
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
})
export class RegistrationPageComponent {}
