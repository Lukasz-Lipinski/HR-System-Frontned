import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelComponent } from './label.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { By } from '@angular/platform-browser';
import { MatLabel } from '@angular/material/form-field';

describe('Testing Label Component', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelComponent],
      imports: [SharedModule],
    }).compileComponents();
    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
  });

  describe('DOM tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeTruthy();
    });
    it('Should displayed label with uppercase', () => {
      component.setLabel = 'test';
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.directive(MatLabel))
        .nativeElement as HTMLElement;
      expect(label.textContent?.trim()).toEqual('Test');
    });
    it('Should displayed label with uppercase when separator is declared', () => {
      component.separator = '-';
      component.setLabel = 'test-test';
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.directive(MatLabel))
        .nativeElement as HTMLElement;
      expect(label.textContent?.trim()).toEqual('Test Test');
    });
    describe('Class tests', () => {
      it('Should be assigned text and returned it as uppercase', () => {
        component.setLabel = 'test';
        expect(component.getLabel).toBe('Test');
      });
      it('Should made label with uppercase when separator is declared', () => {
        component.separator = '-';
        const mockedSentece = 'test-test';
        component.setLabel = mockedSentece;
        expect(component.getLabel).toBe('Test Test');
      });
    });
  });
});
