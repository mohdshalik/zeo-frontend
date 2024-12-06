import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCreationComponent } from './branch-creation.component';

describe('BranchCreationComponent', () => {
  let component: BranchCreationComponent;
  let fixture: ComponentFixture<BranchCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
