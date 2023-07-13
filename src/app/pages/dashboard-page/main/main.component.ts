import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  signal,
} from '@angular/core';
import {
  ActivatedRoute,
  Data,
} from '@angular/router';
import { IEmployee } from 'src/app/services/employees/employees.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  private employees: WritableSignal<IEmployee[]> =
    signal<IEmployee[]>([]);
  get getEmployeesSignal() {
    return this.employees();
  }
  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe({
      next: (data: Data) => {
        this.employees.set(data['employees']);
      },
    });
  }
}
