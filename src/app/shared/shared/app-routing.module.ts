import { NgModule, inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  RouterModule,
  Routes,
} from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/auth/auth.service';
import { checkIfLoggedGuard } from 'src/app/pages/main-page/check-If-Logged-Guard.guard';
import { signInPageGuard } from 'src/app/pages/sign-in-page/sign-in-page.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [checkIfLoggedGuard],
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import(
        '../../pages/sign-in-page/sign-in-page.component'
      ).then((m) => m.SignInPageComponent),
    canActivate: [signInPageGuard],
  },
  {
    path: 'registration',
    loadComponent: () =>
      import(
        '../../pages/registration-page/registration-page.component'
      ).then((m) => m.RegistrationPageComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        '../../pages/dashboard-page/dashboard-page.component'
      ).then((m) => m.DashboardPageComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
