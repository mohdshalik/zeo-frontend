import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollAppovalLevelComponent } from './payroll-appoval-level.component';

describe('PayrollAppovalLevelComponent', () => {
  let component: PayrollAppovalLevelComponent;
  let fixture: ComponentFixture<PayrollAppovalLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayrollAppovalLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayrollAppovalLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
