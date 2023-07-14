import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { DashboardPageComponent } from './dashboard-page.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { By } from '@angular/platform-browser';

describe('Dashboard Page Component tests', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;
  let cdr: ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        DashboardPageComponent,
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(
      DashboardPageComponent
    );
    cdr = fixture.debugElement.injector.get(
      ChangeDetectorRef
    );
    component = fixture.componentInstance;
    cdr.detectChanges();
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeTruthy();
    });
    it('Should displayed navigation component', () => {
      const nav = fixture.debugElement.query(
        By.css('app-navigation')
      ).nativeElement;
      expect(nav).toBeTruthy();
    });
  });
});
