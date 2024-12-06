import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralRequestComponent } from './general-request.component';

describe('GeneralRequestComponent', () => {
  let component: GeneralRequestComponent;
  let fixture: ComponentFixture<GeneralRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
