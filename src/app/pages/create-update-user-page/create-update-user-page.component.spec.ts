import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { CreateUpdateUserPageComponent } from './create-update-user-page.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { UserCredentialFormComponent } from 'src/app/components/user-credential-form/user-credential-form.component';
import {
  mockedEnvironment,
  mockedSuperiors,
} from 'src/app/mocks/mocks';
import { SuperiorsService } from 'src/app/services/superiors/superiors.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Testing Create-Update Page Component', () => {
  let fixture: ComponentFixture<CreateUpdateUserPageComponent>;
  let component: CreateUpdateUserPageComponent;
  let cdr: ChangeDetectorRef;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CreateUpdateUserPageComponent,
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            title: of('Test'),
            data: of({
              superiors: of(mockedSuperiors),
            }),
          },
        },
        {
          provide: 'LocalEnv',
          useValue: mockedEnvironment,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(
      CreateUpdateUserPageComponent
    );
    component = fixture.componentInstance;
    cdr = fixture.debugElement.injector.get(
      ChangeDetectorRef
    );
    activatedRoute = TestBed.inject(
      ActivatedRoute
    );
    component.ngOnInit();
    cdr.detectChanges();
  });

  describe('Class Tests', () => {
    it('Should returned title', () => {
      expect(component.getTitle).toBe('Test');
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeTruthy();
    });
    it('Should dispalyed h1 with title', () => {
      const title =
        fixture.nativeElement.querySelector(
          'h1'
        ) as HTMLHeadingElement;
      expect(title.textContent?.trim()).toBe(
        'Test'
      );
    });
    it('Should dispalyed user credential form', () => {
      const form = fixture.debugElement.query(
        By.directive(UserCredentialFormComponent)
      ).nativeElement as HTMLFormElement;
      expect(form).toBeTruthy();
    });
  });
});
