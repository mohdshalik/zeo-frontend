import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentMasterComponent } from './department-master.component';

describe('DepartmentMasterComponent', () => {
  let component: DepartmentMasterComponent;
  let fixture: ComponentFixture<DepartmentMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
