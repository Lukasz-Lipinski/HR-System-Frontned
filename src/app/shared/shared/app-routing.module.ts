import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () =>
      import(
        '../../pages/sign-in-page/sign-in-page.component'
      ).then((m) => m.SignInPageComponent),
  },
  {
    path: 'registration',
    loadComponent: () =>
      import(
        '../../pages/registration-page/registration-page.component'
      ).then((m) => m.RegistrationPageComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
