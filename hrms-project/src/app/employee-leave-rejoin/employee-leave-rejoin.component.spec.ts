import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveRejoinComponent } from './employee-leave-rejoin.component';

describe('EmployeeLeaveRejoinComponent', () => {
  let component: EmployeeLeaveRejoinComponent;
  let fixture: ComponentFixture<EmployeeLeaveRejoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeLeaveRejoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeLeaveRejoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
