import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
  get getPageSizeOption() {
    return [10, 25, 50, 100];
  }
  @Input({ required: true })
  employees!: IEmployee[];
  private dataSoure!: MatTableDataSource<IEmployee>;
  get getDataSoure() {
    return this.dataSoure;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataSoure = new MatTableDataSource<IEmployee>(this.employees);
  }

  ngAfterViewInit() {
    this.dataSoure.paginator = this.paginator;
  }

  editEmployee(id: string) {
    this.router.navigate(['update-user'], {
      relativeTo: this.activatedRoute,
      queryParams: { id },
    });
  }
}
