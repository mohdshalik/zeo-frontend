import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaceMarkingComponent } from './attendace-marking.component';

describe('AttendaceMarkingComponent', () => {
  let component: AttendaceMarkingComponent;
  let fixture: ComponentFixture<AttendaceMarkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendaceMarkingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendaceMarkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
