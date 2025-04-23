import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryOptionsComponent } from './salary-options.component';

describe('SalaryOptionsComponent', () => {
  let component: SalaryOptionsComponent;
  let fixture: ComponentFixture<SalaryOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaryOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalaryOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
