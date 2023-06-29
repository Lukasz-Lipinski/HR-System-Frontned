import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-create-update-user-page',
  templateUrl:
    './create-update-user-page.component.html',
  styleUrls: [
    './create-update-user-page.component.scss',
  ],
  standalone: true,
  imports: [SharedModule],
})
export class CreateUpdateUserPageComponent {}
