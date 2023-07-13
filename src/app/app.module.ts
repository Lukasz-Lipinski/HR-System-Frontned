import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './shared/shared/app-routing.module';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { CreateUpdateUserPageComponent } from './pages/create-update-user-page/create-update-user-page.component';
import { environment } from './env/environment';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { MainComponent } from './pages/dashboard-page/main/main.component';

const pages = [
  SignInPageComponent,
  RegistrationPageComponent,
  DashboardPageComponent,
  CreateUpdateUserPageComponent,
  AccountPageComponent,
  MainComponent,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ...pages,
  ],
  exports: [...pages, SharedModule],
  providers: [
    {
      provide: 'LocalEnv',
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
