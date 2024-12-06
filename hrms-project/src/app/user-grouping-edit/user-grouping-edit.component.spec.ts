import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupingEditComponent } from './user-grouping-edit.component';

describe('UserGroupingEditComponent', () => {
  let component: UserGroupingEditComponent;
  let fixture: ComponentFixture<UserGroupingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGroupingEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserGroupingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
