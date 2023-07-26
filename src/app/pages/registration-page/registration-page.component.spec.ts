// import {
//   ComponentFixture,
//   TestBed,
// } from '@angular/core/testing';
// import { ChangeDetectorRef } from '@angular/core';
// import { By } from '@angular/platform-browser';
// import {
//   ActivatedRoute,
//   Router,
//   Routes,
// } from '@angular/router';
// import { SharedModule } from 'src/app/shared/shared/shared.module';
// import { RouterTestingModule } from '@angular/router/testing';
// import { mockedEnvironment } from 'src/app/mocks/mocks';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RegistartionFormComponent } from 'src/app/components/registartion-form/registartion-form.component';
// import { RegistrationPageComponent } from './registration-page.component';

// describe('Testing Registration Page ', () => {
//   let fixture: ComponentFixture<RegistrationPageComponent>;
//   let component: RegistrationPageComponent;
//   let cdr: ChangeDetectorRef;
//   let router: Router;

//   const mockedRoutes: Routes = [
//     {
//       path: '',
//       component: RegistartionFormComponent,
//     },
//     {
//       path: 'sign-in',
//       component: RegistartionFormComponent,
//     },
//   ];

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [RegistartionFormComponent],
//       imports: [
//         RegistrationPageComponent,
//         SharedModule,
//         RouterTestingModule.withRoutes(
//           mockedRoutes
//         ),
//         BrowserAnimationsModule,
//       ],
//       providers: [
//         {
//           provide: 'LocalEnv',
//           useValue: mockedEnvironment,
//         },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(
//       RegistrationPageComponent
//     );
//     component = fixture.componentInstance;

//     router = TestBed.inject(Router);
//     cdr.detectChanges();
//   });

//   describe('DOM Tests', () => {
//     it('Should be rendered', () => {
//       expect(component).toBeTruthy();
//     });
//     it('Should displayed a button', () => {
//       const btn = fixture.debugElement.query(
//         By.css('button')
//       ).nativeElement as HTMLButtonElement;

//       expect(btn).toBeTruthy();
//     });
//     it('Should displayed header wth form title', () => {
//       const header = fixture.debugElement.query(
//         By.css('h1')
//       ).nativeElement as HTMLHeadingElement;

//       expect(header).toBeTruthy();
//       expect(header.textContent?.trim()).toEqual(
//         'Creata your account'
//       );
//     });
//     it('Should displayed registration form component', () => {
//       const form = fixture.debugElement.query(
//         By.directive(RegistartionFormComponent)
//       ).nativeElement as HTMLFormElement;
//       expect(form).toBeTruthy();
//     });
//   });
// });
