import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUploadedDetailsComponent } from './employee-uploaded-details.component';

describe('EmployeeUploadedDetailsComponent', () => {
  let component: EmployeeUploadedDetailsComponent;
  let fixture: ComponentFixture<EmployeeUploadedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeUploadedDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeUploadedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
