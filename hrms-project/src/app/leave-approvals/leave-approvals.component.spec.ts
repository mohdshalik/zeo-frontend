import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApprovalsComponent } from './leave-approvals.component';

describe('LeaveApprovalsComponent', () => {
  let component: LeaveApprovalsComponent;
  let fixture: ComponentFixture<LeaveApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveApprovalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
