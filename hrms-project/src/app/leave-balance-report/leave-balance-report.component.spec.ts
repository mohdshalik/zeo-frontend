import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceReportComponent } from './leave-balance-report.component';

describe('LeaveBalanceReportComponent', () => {
  let component: LeaveBalanceReportComponent;
  let fixture: ComponentFixture<LeaveBalanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveBalanceReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveBalanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
