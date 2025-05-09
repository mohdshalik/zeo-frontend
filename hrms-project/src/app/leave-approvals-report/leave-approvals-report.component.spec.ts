import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApprovalsReportComponent } from './leave-approvals-report.component';

describe('LeaveApprovalsReportComponent', () => {
  let component: LeaveApprovalsReportComponent;
  let fixture: ComponentFixture<LeaveApprovalsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveApprovalsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveApprovalsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
