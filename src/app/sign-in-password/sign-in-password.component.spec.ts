import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInPasswordComponent } from './sign-in-password.component';

describe('SignInPasswordComponent', () => {
  let component: SignInPasswordComponent;
  let fixture: ComponentFixture<SignInPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
