import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRepaymentComponent } from './loan-repayment.component';

describe('LoanRepaymentComponent', () => {
  let component: LoanRepaymentComponent;
  let fixture: ComponentFixture<LoanRepaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanRepaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanRepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
