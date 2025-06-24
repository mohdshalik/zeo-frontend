import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceSalaryApprovalsComponent } from './advance-salary-approvals.component';

describe('AdvanceSalaryApprovalsComponent', () => {
  let component: AdvanceSalaryApprovalsComponent;
  let fixture: ComponentFixture<AdvanceSalaryApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvanceSalaryApprovalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceSalaryApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
