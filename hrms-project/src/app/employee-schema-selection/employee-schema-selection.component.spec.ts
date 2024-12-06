import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSchemaSelectionComponent } from './employee-schema-selection.component';

describe('EmployeeSchemaSelectionComponent', () => {
  let component: EmployeeSchemaSelectionComponent;
  let fixture: ComponentFixture<EmployeeSchemaSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeSchemaSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeSchemaSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
