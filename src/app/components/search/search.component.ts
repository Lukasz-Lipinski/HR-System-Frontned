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
  searchForm!: FormGroup<ISearchForm>;
  @Output() onSearchEmitter =
    new EventEmitter<string>();
  ngOnInit() {
    this.searchForm = new FormGroup<ISearchForm>({
      searchField: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
  onSearch() {
    const { value } =
      this.searchForm.controls['searchField'];
    value && this.onSearchEmitter.emit(value);
  }
}
