import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceSalaryRequestComponent } from './advance-salary-request.component';

describe('AdvanceSalaryRequestComponent', () => {
  let component: AdvanceSalaryRequestComponent;
  let fixture: ComponentFixture<AdvanceSalaryRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvanceSalaryRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceSalaryRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
