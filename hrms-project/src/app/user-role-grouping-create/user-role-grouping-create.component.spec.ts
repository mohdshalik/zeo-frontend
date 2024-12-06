import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleGroupingCreateComponent } from './user-role-grouping-create.component';

describe('UserRoleGroupingCreateComponent', () => {
  let component: UserRoleGroupingCreateComponent;
  let fixture: ComponentFixture<UserRoleGroupingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRoleGroupingCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRoleGroupingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
