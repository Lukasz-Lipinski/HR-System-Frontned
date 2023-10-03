import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  private label: string = '';
  get getLabel() {
    return this.label;
  }
  @Input({
    required: true,
  })
  set setLabel(fieldName: string) {
    this.label = this.setToUppercase(fieldName);
  }
  @Input() separator: string = ' ';

  private setToUppercase(label: string) {
    const words: string[] = label.split(this.separator);
    let uppercaseLabel = '';

    for (let word of words) {
      uppercaseLabel = uppercaseLabel.concat(
        ' ',
        word.charAt(0).toUpperCase().concat(word.slice(1))
      );
    }

    return uppercaseLabel.trim();
  }
}
