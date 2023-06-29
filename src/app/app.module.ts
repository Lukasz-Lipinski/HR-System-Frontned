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

const pages = [
  SignInPageComponent,
  RegistrationPageComponent,
  DashboardPageComponent,
  CreateUpdateUserPageComponent,
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
