import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTemplateComponent } from './leave-template.component';

describe('LeaveTemplateComponent', () => {
  let component: LeaveTemplateComponent;
  let fixture: ComponentFixture<LeaveTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
