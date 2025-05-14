import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAccruvalComponent } from './leave-accruval.component';

describe('LeaveAccruvalComponent', () => {
  let component: LeaveAccruvalComponent;
  let fixture: ComponentFixture<LeaveAccruvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveAccruvalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveAccruvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
