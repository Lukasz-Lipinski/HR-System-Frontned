import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from "@angular/material/paginator";

import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { SigninFormComponent } from 'src/app/components/signin-form/signin-form.component';
import { LoaderProgressComponent } from 'src/app/components/loader-progress/loader-progress.component';
import { EmployeesListComponent } from 'src/app/components/employees-list/employees-list.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { AccountFormComponent } from 'src/app/components/account-form/account-form.component';
import { PasswordFormComponent } from 'src/app/components/password-form/password-form.component';
import { RegistartionFormComponent } from 'src/app/components/registartion-form/registartion-form.component';
import { UserCredentialFormComponent } from 'src/app/components/user-credential-form/user-credential-form.component';
import { LabelComponent } from 'src/app/components/password-form/label/label.component';

const components: any[] = [
  NavigationComponent,
  LoaderComponent,
  SigninFormComponent,
  LoaderProgressComponent,
  EmployeesListComponent,
  SearchComponent,
  AccountFormComponent,
  PasswordFormComponent,
  RegistartionFormComponent,
  UserCredentialFormComponent,
  LabelComponent,
];

const modules = [
  MatTabsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  ReactiveFormsModule,
  CommonModule,
  RouterModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  HttpClientModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatTableModule,
  MatGridListModule,
  MatTooltipModule,
  MatSelectModule,
  MatPaginatorModule,
];

@NgModule({
  declarations: components,
  imports: [...modules],
  exports: [...modules, ...components],
})
export class SharedModule { }
