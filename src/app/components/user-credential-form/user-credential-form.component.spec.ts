import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCredentialFormComponent } from './user-credential-form.component';

describe('UserCredentialFormComponent', () => {
  let component: UserCredentialFormComponent;
  let fixture: ComponentFixture<UserCredentialFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCredentialFormComponent]
    });
    fixture = TestBed.createComponent(UserCredentialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
