import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensatoryLeaveComponent } from './compensatory-leave.component';

describe('CompensatoryLeaveComponent', () => {
  let component: CompensatoryLeaveComponent;
  let fixture: ComponentFixture<CompensatoryLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompensatoryLeaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompensatoryLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
