import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchMasterComponent } from './branch-master.component';

describe('BranchMasterComponent', () => {
  let component: BranchMasterComponent;
  let fixture: ComponentFixture<BranchMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
