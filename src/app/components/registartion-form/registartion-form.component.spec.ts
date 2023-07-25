import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RegistartionFormComponent } from './registartion-form.component';
import { ChangeDetectorRef } from '@angular/core';

describe('Testing Registration Form Component', () => {
  let fixture: ComponentFixture<RegistartionFormComponent>;
  let component: RegistartionFormComponent;
  let cdr: ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistartionFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      RegistartionFormComponent
    );
    component = fixture.componentInstance;
    cdr = fixture.debugElement.injector.get(
      ChangeDetectorRef
    );

    component.ngOnInit();
    cdr.detectChanges();
  });

  describe('Class Tests', () => {
    it('Should...');
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeTruthy();
    });
  });
});
