import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentReportComponent } from './department-report.component';

describe('DepartmentReportComponent', () => {
  let component: DepartmentReportComponent;
  let fixture: ComponentFixture<DepartmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
