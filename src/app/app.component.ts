import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { ColorType } from './components/loader-progress/loader-progress.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private spinner = signal<boolean>(true);
  get isSpinner() {
    return this.spinner();
  }
  private color = signal<ColorType>('accent');
  get getColor() {
    return this.color();
  }
  timer: any;

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
          this.color.set('primary');
          this.timer = this.startTimer(2000);
        }
      },
    });
  }

  ngOnInit(): void {}

  startTimer = (time: number) =>
    setTimeout(() => {
      this.spinner.set(false);
    }, time);

  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}
