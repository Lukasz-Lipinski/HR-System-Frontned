import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
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
    'actions',
  ];
  @Input({ required: true })
  employees!: IEmployee[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  editEmployee(id: string) {
    this.router.navigate(['update-user'], {
      relativeTo: this.activatedRoute,
      queryParams: { id },
    });
  }
}
