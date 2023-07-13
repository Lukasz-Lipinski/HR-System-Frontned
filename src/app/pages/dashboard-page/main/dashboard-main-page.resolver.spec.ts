import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { dashboardMainPageResolver } from './dashboard-main-page.resolver';

describe('dashboardMainPageResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => dashboardMainPageResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
