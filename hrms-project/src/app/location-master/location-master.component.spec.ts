import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMasterComponent } from './location-master.component';

describe('LocationMasterComponent', () => {
  let component: LocationMasterComponent;
  let fixture: ComponentFixture<LocationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
