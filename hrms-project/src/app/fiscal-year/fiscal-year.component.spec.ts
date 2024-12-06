import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalYearComponent } from './fiscal-year.component';

describe('FiscalYearComponent', () => {
  let component: FiscalYearComponent;
  let fixture: ComponentFixture<FiscalYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiscalYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiscalYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
