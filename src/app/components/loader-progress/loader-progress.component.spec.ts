import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { LoaderProgressComponent } from './loader-progress.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('Testing LoaderProgressComponent', () => {
  let fixture: ComponentFixture<LoaderProgressComponent>;
  let component: LoaderProgressComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderProgressComponent],
      imports: [MatProgressBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LoaderProgressComponent
    );
    component = fixture.componentInstance;
  });

  describe('Class Tests', () => {
    it('Should demended color props', () => {
      component.color = 'warn';
      expect(component.color).toEqual('warn');
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeTruthy();
    });
  });
});
