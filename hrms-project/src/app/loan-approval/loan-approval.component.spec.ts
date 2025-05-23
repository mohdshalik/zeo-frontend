import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApprovalComponent } from './loan-approval.component';

describe('LoanApprovalComponent', () => {
  let component: LoanApprovalComponent;
  let fixture: ComponentFixture<LoanApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
