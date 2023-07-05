import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

export type ColorType =
  | 'primary'
  | 'accent'
  | 'warn';

@Component({
  selector: 'app-loader-progress',
  templateUrl: './loader-progress.component.html',
  styleUrls: ['./loader-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderProgressComponent {
  @Input({
    required: true,
  })
  color!: ColorType;
}
