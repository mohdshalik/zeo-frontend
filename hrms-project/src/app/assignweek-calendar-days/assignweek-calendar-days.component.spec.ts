import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignweekCalendarDaysComponent } from './assignweek-calendar-days.component';

describe('AssignweekCalendarDaysComponent', () => {
  let component: AssignweekCalendarDaysComponent;
  let fixture: ComponentFixture<AssignweekCalendarDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignweekCalendarDaysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignweekCalendarDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
