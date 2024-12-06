import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddMoreFieldComponent } from './employee-add-more-field.component';

describe('EmployeeAddMoreFieldComponent', () => {
  let component: EmployeeAddMoreFieldComponent;
  let fixture: ComponentFixture<EmployeeAddMoreFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeAddMoreFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeAddMoreFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
