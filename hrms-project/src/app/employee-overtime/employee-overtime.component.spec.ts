import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOvertimeComponent } from './employee-overtime.component';

describe('EmployeeOvertimeComponent', () => {
  let component: EmployeeOvertimeComponent;
  let fixture: ComponentFixture<EmployeeOvertimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeOvertimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
