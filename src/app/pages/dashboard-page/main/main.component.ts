import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRoute,
  Data,
} from '@angular/router';
import { tap, map } from 'rxjs';
import { IBackendReponse } from 'src/app/services/auth/auth.service';
import { EmployeesService, IEmployee } from 'src/app/services/employees/employees.service';
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
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private employeesService: EmployeesService = inject(EmployeesService);

  private isLoadingState = signal<boolean>(false);
  get isLoadingStateSignal() {
    return this.isLoadingState.asReadonly();
  }
  private employees: Signal<IEmployee[]> = toSignal(this.activatedRoute.data.pipe(
    map(
      (data: Data) => data['employees'])
  ), {
    requireSync: true
  })
  get getEmployeesSignal() {
    return this.employees;
  }
  private snackbar: MatSnackBar = inject(MatSnackBar);

  ngOnInit() {
  }

  onSearch(parameter: string) {
    this.isLoadingState.set(true);
    this.employees = toSignal(this.employeesService.findEmployees(parameter).pipe(
      tap(
        (res: IBackendReponse<IEmployee[]>) => {
          res.error && this.snackbar.open(res.message, "Close", {
            duration: 2000,
            panelClass: ['snackbar-error']
          });
        }
      ),
      map((res) => {
        this.isLoadingState.set(false);
        return res.data;
      })
    ), {
      requireSync: true
    });
  }
}
