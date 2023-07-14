import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
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
export class CreateUpdateUserPageComponent {
  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        console.log(params);
      },
    });
  }
}
