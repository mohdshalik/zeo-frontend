import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCreationComponent } from './department-creation.component';

describe('DepartmentCreationComponent', () => {
  let component: DepartmentCreationComponent;
  let fixture: ComponentFixture<DepartmentCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
