import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionAssignedComponent } from './permission-assigned.component';

describe('PermissionAssignedComponent', () => {
  let component: PermissionAssignedComponent;
  let fixture: ComponentFixture<PermissionAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermissionAssignedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissionAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
