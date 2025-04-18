import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollDetailsComponent } from './payroll-details.component';

describe('PayrollDetailsComponent', () => {
  let component: PayrollDetailsComponent;
  let fixture: ComponentFixture<PayrollDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayrollDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayrollDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
