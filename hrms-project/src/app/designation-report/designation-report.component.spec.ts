import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationReportComponent } from './designation-report.component';

describe('DesignationReportComponent', () => {
  let component: DesignationReportComponent;
  let fixture: ComponentFixture<DesignationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignationReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesignationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
