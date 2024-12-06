import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWeekcalendarComponent } from './assign-weekcalendar.component';

describe('AssignWeekcalendarComponent', () => {
  let component: AssignWeekcalendarComponent;
  let fixture: ComponentFixture<AssignWeekcalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignWeekcalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignWeekcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
