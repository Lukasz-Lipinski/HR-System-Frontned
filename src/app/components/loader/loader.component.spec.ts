import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

describe('Testing LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let cdr: ChangeDetectorRef;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      imports: [
        SharedModule,
        MatProgressSpinnerModule,
      ],
      providers: [ChangeDetectorRef],
    });
    fixture = TestBed.createComponent(
      LoaderComponent
    );
    component = fixture.componentInstance;
    cdr =
      fixture.debugElement.injector.get<ChangeDetectorRef>(
        ChangeDetectorRef
      );
    fixture.detectChanges();
  }));

  describe('Class tests', () => {
    it('Should be false at the start', () => {
      expect(component.isSpinner).toBeFalse();
    });
    it('Should be true', () => {
      component.isSpinner = true;
      expect(component.isSpinner).toBeTrue();
    });
  });

  describe('DOM tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeTruthy();
    });
    it('Should shown spinner if true', () => {
      expect(component.isSpinner).toBeFalse();
      component.isSpinner = true;
      let spinner = fixture.debugElement.query(
        By.css('mat-spinner')
      );
      cdr.detectChanges();
      expect(component.isSpinner).toBeTrue();
      spinner = fixture.debugElement.query(
        By.css('mat-spinner')
      ).nativeElement;

      expect(spinner).toBeDefined();
    });
  });
});
