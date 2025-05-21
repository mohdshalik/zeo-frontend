import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApprovelLevelComponent } from './loan-approvel-level.component';

describe('LoanApprovelLevelComponent', () => {
  let component: LoanApprovelLevelComponent;
  let fixture: ComponentFixture<LoanApprovelLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanApprovelLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanApprovelLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
