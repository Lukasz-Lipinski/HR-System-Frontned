import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent {
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

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
  private dataSoure!: MatTableDataSource<IEmployee>;
  @Input({ required: true }) employees!: IEmployee[];
  get getDataSoure() {
    return this.dataSoure;
  }

  ngOnInit() {
    this.dataSoure = new MatTableDataSource<IEmployee>(this.employees);
  }

  ngOnChanges() {
    this.dataSoure = new MatTableDataSource<IEmployee>(this.employees);
  }

  ngAfterViewInit() {
    this.dataSoure.paginator = this.paginator;
  }
  ngAfterViewChecked() {
    if (this.paginator !== this.dataSoure.paginator)
      this.dataSoure.paginator = this.paginator;
  }

  onEditEmployee(id: string) {
    this.router.navigate(['update-user'], {
      relativeTo: this.activatedRoute,
      queryParams: { id },
    });
  }
}
