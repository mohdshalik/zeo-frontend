import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalLevelComponent } from './approval-level.component';

describe('ApprovalLevelComponent', () => {
  let component: ApprovalLevelComponent;
  let fixture: ComponentFixture<ApprovalLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
