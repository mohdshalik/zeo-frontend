import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirticketRequestComponent } from './airticket-request.component';

describe('AirticketRequestComponent', () => {
  let component: AirticketRequestComponent;
  let fixture: ComponentFixture<AirticketRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirticketRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirticketRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
