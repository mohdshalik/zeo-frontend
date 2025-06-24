import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirTicketOptionsComponent } from './air-ticket-options.component';

describe('AirTicketOptionsComponent', () => {
  let component: AirTicketOptionsComponent;
  let fixture: ComponentFixture<AirTicketOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirTicketOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirTicketOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
