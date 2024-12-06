import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupingMasterComponent } from './user-grouping-master.component';

describe('UserGroupingMasterComponent', () => {
  let component: UserGroupingMasterComponent;
  let fixture: ComponentFixture<UserGroupingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGroupingMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserGroupingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
