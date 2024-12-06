import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSctionComponent } from './employee-sction.component';

describe('EmployeeSctionComponent', () => {
  let component: EmployeeSctionComponent;
  let fixture: ComponentFixture<EmployeeSctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeSctionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeSctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
