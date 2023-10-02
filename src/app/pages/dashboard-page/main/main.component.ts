import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data } from '@angular/router';
import { tap, map } from 'rxjs';
import { IBackendReponse } from 'src/app/services/auth/auth.service';
import {
  EmployeesService,
  IEmployee,
} from 'src/app/services/employees/employees.service';
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
  private employees$: Signal<IEmployee[]> = toSignal(
    this.activatedRoute.data.pipe(map((data: Data) => data['employees']))
  );
  private searchParam = signal<string>('');
  private employees = computed(() => {
    if (!this.searchParam()) return this.employees$();

    return this.employees$().filter((user) =>
      `${user.name.toLowerCase()} ${user.surname.toLowerCase()}`.includes(
        this.searchParam().toLowerCase()
      )
    );
  });

  get getEmployees() {
    return this.employees();
  }

  onSearch(parameter: string) {
    this.searchParam.set(parameter);
  }
}
