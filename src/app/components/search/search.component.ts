import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

interface ISearchForm {
  searchField: FormControl<string>;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchForm: FormGroup<ISearchForm> = new FormGroup<ISearchForm>({
    searchField: new FormControl<string>('', {
      nonNullable: true,
    }),
  });
  @Output() onSearchEmitter = new EventEmitter<string>();

  onSearch() {
    const { value } = this.searchForm.controls['searchField'];
    value && this.onSearchEmitter.emit(value);
  }
  onSearchByEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearchEmitter.emit(this.searchForm.controls['searchField'].value);
    }
  }
}
