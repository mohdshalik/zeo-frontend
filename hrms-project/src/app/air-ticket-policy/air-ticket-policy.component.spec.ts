import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirTicketPolicyComponent } from './air-ticket-policy.component';

describe('AirTicketPolicyComponent', () => {
  let component: AirTicketPolicyComponent;
  let fixture: ComponentFixture<AirTicketPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirTicketPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirTicketPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
