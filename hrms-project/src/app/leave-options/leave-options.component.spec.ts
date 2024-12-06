import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveOptionsComponent } from './leave-options.component';

describe('LeaveOptionsComponent', () => {
  let component: LeaveOptionsComponent;
  let fixture: ComponentFixture<LeaveOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
