import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignHolidayCalendarComponent } from './assign-holiday-calendar.component';

describe('AssignHolidayCalendarComponent', () => {
  let component: AssignHolidayCalendarComponent;
  let fixture: ComponentFixture<AssignHolidayCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignHolidayCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignHolidayCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
