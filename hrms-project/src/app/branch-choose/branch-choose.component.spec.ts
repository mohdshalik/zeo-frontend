import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchChooseComponent } from './branch-choose.component';

describe('BranchChooseComponent', () => {
  let component: BranchChooseComponent;
  let fixture: ComponentFixture<BranchChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchChooseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
