import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RegistrationPageComponent } from './registration-page.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardPageComponent } from '../dashboard-page/dashboard-page.component';
import {
  mockedBodyRequestRegister,
  mockedEnvironment,
} from 'src/app/mocks/mocks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { SignInPageComponent } from '../sign-in-page/sign-in-page.component';
import { RegistartionFormComponent } from 'src/app/components/registartion-form/registartion-form.component';

describe('Testing Registration Page', () => {
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let component: RegistrationPageComponent;
  let cdr: ChangeDetectorRef;
  let router: Router;
  let authService: AuthService;

  const mockedRoutes: Routes = [
    {
      path: '',
      component: RegistrationPageComponent,
    },
    {
      path: 'dashboard',
      component: DashboardPageComponent,
    },
    {
      path: 'sign-in',
      component: SignInPageComponent,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RegistrationPageComponent,
        SharedModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(
          mockedRoutes
        ),
      ],
      providers: [
        AuthService,
        {
          provide: 'LocalEnv',
          useValue: mockedEnvironment,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(
      RegistrationPageComponent
    );
    component = fixture.componentInstance;
    cdr = fixture.debugElement.injector.get(
      ChangeDetectorRef
    );
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    component.ngOnInit();
    cdr.detectChanges();
  });

  describe('Class Tests', () => {
    it('Should returned isLoading as false initially', () => {
      expect(
        component.getIsLoadingState
      ).toBeFalse();
    });
    it('Should switched a isLoading on true', fakeAsync(() => {
      component.onRegister(
        mockedBodyRequestRegister
      );
      tick();
      expect(
        component.getIsLoadingState
      ).toBeTrue();
    }));
  });

  describe('DOM Tests', () => {
    it('Should be rendered correctly', () => {
      expect(component).toBeTruthy();
    });
    it('Should displayed button with routerLink and after clicking should redirected', fakeAsync(() => {
      const btn = fixture.debugElement.query(
        By.css('button')
      ).nativeElement as HTMLButtonElement;
      expect(btn).toBeTruthy();
      expect(btn.textContent?.trim()).toContain(
        'Back'
      );
      expect(btn.textContent?.trim()).toContain(
        'arrow_back_ios'
      );

      expect(router.url).toEqual('/');
      btn.click();
      tick();
      expect(router.url).toEqual('/sign-in');
    }));
    it("Should displayed header with 'Create your account'", () => {
      const header = fixture.debugElement.query(
        By.css('h1')
      ).nativeElement as HTMLHeadingElement;
      expect(header).toBeTruthy();
      expect(header.textContent?.trim()).toEqual(
        'Create your account'
      );
    });
    it('Should dispalyed registration form', () => {
      const form = fixture.debugElement.query(
        By.directive(RegistartionFormComponent)
      ).nativeElement;

      expect(form).toBeTruthy();
    });
  });
});
