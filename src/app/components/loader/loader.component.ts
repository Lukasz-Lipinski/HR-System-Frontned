import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Signal,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() isSpinner: Signal<boolean> =
    signal(false);
}
