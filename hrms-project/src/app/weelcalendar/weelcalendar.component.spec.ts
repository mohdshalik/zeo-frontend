import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeelcalendarComponent } from './weelcalendar.component';

describe('WeelcalendarComponent', () => {
  let component: WeelcalendarComponent;
  let fixture: ComponentFixture<WeelcalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeelcalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeelcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
