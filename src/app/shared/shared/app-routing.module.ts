import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import {
  AuthService,
  IAdminCredential,
} from 'src/app/auth/auth.service';
import { accountPageResolver } from 'src/app/pages/account-page/account-page.resolver';
import { checkIfLoggedGuard } from 'src/app/pages/dashboard-page/main/check-If-Logged-Guard.guard';
import { dashboardMainPageResolver } from 'src/app/pages/dashboard-page/main/dashboard-main-page.resolver';
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
    // canMatch: [checkIfLoggedGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            '../../pages/dashboard-page/main/main.component'
          ).then((m) => m.MainComponent),
        resolve: {
          employees: dashboardMainPageResolver,
        },
      },
      {
        path: 'account',
        loadComponent: () =>
          import(
            '../../pages/account-page/account-page.component'
          ).then((m) => m.AccountPageComponent),
        resolve: {
          adminCred: accountPageResolver,
        },
      },
      {
        path: 'create-user',
        loadComponent: () =>
          import(
            '../../pages/create-update-user-page/create-update-user-page.component'
          ).then(
            (m) => m.CreateUpdateUserPageComponent
          ),
      },
      {
        path: 'update-user',
        loadComponent: () =>
          import(
            '../../pages/create-update-user-page/create-update-user-page.component'
          ).then(
            (m) => m.CreateUpdateUserPageComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
