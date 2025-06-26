import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirticketAllocationComponent } from './airticket-allocation.component';

describe('AirticketAllocationComponent', () => {
  let component: AirticketAllocationComponent;
  let fixture: ComponentFixture<AirticketAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirticketAllocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirticketAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
