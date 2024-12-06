import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UesrEmployeeComponent } from './uesr-employee.component';

describe('UesrEmployeeComponent', () => {
  let component: UesrEmployeeComponent;
  let fixture: ComponentFixture<UesrEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UesrEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UesrEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
