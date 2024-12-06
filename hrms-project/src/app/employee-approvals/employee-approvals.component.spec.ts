import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeApprovalsComponent } from './employee-approvals.component';

describe('EmployeeApprovalsComponent', () => {
  let component: EmployeeApprovalsComponent;
  let fixture: ComponentFixture<EmployeeApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeApprovalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
