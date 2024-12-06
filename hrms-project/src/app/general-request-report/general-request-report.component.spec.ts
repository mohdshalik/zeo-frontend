import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralRequestReportComponent } from './general-request-report.component';

describe('GeneralRequestReportComponent', () => {
  let component: GeneralRequestReportComponent;
  let fixture: ComponentFixture<GeneralRequestReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralRequestReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralRequestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
