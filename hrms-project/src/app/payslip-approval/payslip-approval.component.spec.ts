import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipApprovalComponent } from './payslip-approval.component';

describe('PayslipApprovalComponent', () => {
  let component: PayslipApprovalComponent;
  let fixture: ComponentFixture<PayslipApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayslipApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayslipApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
