import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceSalaryApprovalLevelComponent } from './advance-salary-approval-level.component';

describe('AdvanceSalaryApprovalLevelComponent', () => {
  let component: AdvanceSalaryApprovalLevelComponent;
  let fixture: ComponentFixture<AdvanceSalaryApprovalLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvanceSalaryApprovalLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceSalaryApprovalLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
