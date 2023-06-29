import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'hr-system-frontend';
  private spinner = signal<boolean>(true);
  get isSpinner() {
    return this.spinner();
  }

  constructor(private router: Router) {
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationStart) {
          this.spinner.set(true);
        }
        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationError
        ) {
          this.spinner.set(false);
        }
      },
    });
  }

  ngOnInit(): void {}
}
