import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmediateRejectionComponent } from './immediate-rejection.component';

describe('ImmediateRejectionComponent', () => {
  let component: ImmediateRejectionComponent;
  let fixture: ComponentFixture<ImmediateRejectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImmediateRejectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImmediateRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
