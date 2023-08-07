import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
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
  private activatedRoute = inject(ActivatedRoute);
  private title = toSignal(
    this.activatedRoute.title
  );
  get getTitle() {
    return this.title();
  }
  constructor() {}

  ngOnInit() {}
}
