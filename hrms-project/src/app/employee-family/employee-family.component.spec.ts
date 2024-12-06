import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFamilyComponent } from './employee-family.component';

describe('EmployeeFamilyComponent', () => {
  let component: EmployeeFamilyComponent;
  let fixture: ComponentFixture<EmployeeFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeFamilyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
