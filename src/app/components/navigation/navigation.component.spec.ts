import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  ILink,
  NavigationComponent,
} from './navigation.component';
import { ChangeDetectorRef } from '@angular/core';
import { mockedLinks } from '../../mocks/mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { By } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';

describe('Testing NavigationComponent', () => {
  let fixture: ComponentFixture<NavigationComponent>;
  let component: NavigationComponent;
  let cdr: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(
      NavigationComponent
    );
    component = fixture.componentInstance;
    cdr = fixture.debugElement.injector.get(
      ChangeDetectorRef
    );
    cdr.detectChanges();
  });

  describe('Class Tests', () => {
    it('should return links to the navigation component', () => {
      const links = component.getLinks;

      expect(links.length).toBe(3);
      for (let i = 0; i < links.length; i++) {
        expect(links[i].href).toBe(
          mockedLinks[i].href
        );
        expect(links[i].label).toBe(
          mockedLinks[i].label
        );
        expect(links[i].icon).toBe(
          mockedLinks[i].icon
        );
      }
    });
    it('Should returned "prmiary" strings when the label is not "account"', () => {
      expect(component.setColor('test')).toEqual(
        'primary'
      );
    });
    it("Should returned 'accent' when the label is 'account'", () => {
      expect(
        component.setColor('account')
      ).toEqual('accent');
    });
  });

  describe('DOM Tests', () => {
    it('Should render the navigation component', () => {
      expect(component).toBeTruthy();
    });
    it('Should rendered 4 links', () => {
      const links = fixture.debugElement.queryAll(
        By.css('a')
      );

      expect(links.length).toBe(4);
      for (let i = 0; i < links.length - 1; i++) {
        i < links.length &&
          expect(
            links[i].nativeElement.textContent
              .trim()
              .toLowerCase()
          ).toBe(
            mockedLinks[i].label
              .trim()
              .toLowerCase()
          );
      }
      const logoutLink = links.find(
        (link) =>
          (
            link.nativeElement as HTMLLinkElement
          ).getAttribute('color') === 'warn'
      );
      expect(logoutLink).toBeTruthy();
      expect(
        logoutLink?.nativeElement.textContent
          .trim()
          .toLowerCase()
      ).toEqual('logout');
    });
  });
});
