import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { accountPageResolver } from 'src/app/pages/account-page/account-page.resolver';
import { SuperiorResolver } from 'src/app/pages/create-update-user-page/superior.resolver';
import { dashboardMainPageResolver } from 'src/app/pages/dashboard-page/main/dashboard-main-page.resolver';
import {
  CheckIfLoggedGuard,
  SignInPageGuard,
  CheckAuthGuard,
  CheckIfSubpageCanActivate,
} from 'src/app/services/guards/check-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [CheckIfLoggedGuard],
    title: 'HR-System App',
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import(
        '../../pages/sign-in-page/sign-in-page.component'
      ).then((m) => m.SignInPageComponent),
    canActivate: [SignInPageGuard],
    title: 'Sign in',
  },
  {
    path: 'registration',
    loadComponent: () =>
      import(
        '../../pages/registration-page/registration-page.component'
      ).then((m) => m.RegistrationPageComponent),
    title: 'Registration',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        '../../pages/dashboard-page/dashboard-page.component'
      ).then((m) => m.DashboardPageComponent),
    title: 'Dashboard',
    // canActivate: [CheckAuthGuard],
    // canActivateChild: [CheckIfSubpageCanActivate],
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            '../../pages/dashboard-page/main/main.component'
          ).then((m) => m.MainComponent),
        resolve: {
          employees: dashboardMainPageResolver,
          adminCred: accountPageResolver,
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
        title: 'Create user',
        resolve: {
          superiors: SuperiorResolver,
        },
      },
      {
        path: 'update-user',
        loadComponent: () =>
          import(
            '../../pages/create-update-user-page/create-update-user-page.component'
          ).then(
            (m) => m.CreateUpdateUserPageComponent
          ),
        title: 'Update user',
        resolve: {
          superiors: SuperiorResolver,
        },
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
