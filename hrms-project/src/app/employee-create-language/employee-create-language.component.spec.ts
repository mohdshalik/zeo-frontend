import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreateLanguageComponent } from './employee-create-language.component';

describe('EmployeeCreateLanguageComponent', () => {
  let component: EmployeeCreateLanguageComponent;
  let fixture: ComponentFixture<EmployeeCreateLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeCreateLanguageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeCreateLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
