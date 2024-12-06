import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApprovalLevelComponent } from './leave-approval-level.component';

describe('LeaveApprovalLevelComponent', () => {
  let component: LeaveApprovalLevelComponent;
  let fixture: ComponentFixture<LeaveApprovalLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveApprovalLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveApprovalLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
