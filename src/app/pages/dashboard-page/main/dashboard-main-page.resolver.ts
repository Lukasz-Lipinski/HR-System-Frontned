import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import {
  EmployeesService,
  IEmployee,
} from 'src/app/services/employees/employees.service';

export const dashboardMainPageResolver: ResolveFn<
  IEmployee[]
> = (route, state) => {
  const employee = inject(EmployeesService);
  return employee.getEmployees();
};
