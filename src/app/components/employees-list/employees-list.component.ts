import {
  ChangeDetectionStrategy,
  Component,
  Input,
  WritableSignal,
  signal,
} from '@angular/core';
import { IEmployee } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent {
  displayedColumns = [
    'name',
    'surname',
    'email',
    'role',
    'position',
    'daysoff',
    'status',
  ];
  @Input({ required: true })
  employees!: IEmployee[];
  get getEmployees() {
    return this.employees;
  }
  ngOnInit() {}
}
