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

import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { SigninFormComponent } from 'src/app/components/signin-form/signin-form.component';

const components: any[] = [
  NavigationComponent,
  LoaderComponent,
  SigninFormComponent,
];

const modules = [
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  CommonModule,
  RouterModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  HttpClientModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: components,
  imports: [...modules],
  exports: [...modules, ...components],
})
export class SharedModule {}
