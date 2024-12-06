import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGenerateComponent } from './report-generate.component';

describe('ReportGenerateComponent', () => {
  let component: ReportGenerateComponent;
  let fixture: ComponentFixture<ReportGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportGenerateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
