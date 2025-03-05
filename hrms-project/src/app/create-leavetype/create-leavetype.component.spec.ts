import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeavetypeComponent } from './create-leavetype.component';

describe('CreateLeavetypeComponent', () => {
  let component: CreateLeavetypeComponent;
  let fixture: ComponentFixture<CreateLeavetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLeavetypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLeavetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
