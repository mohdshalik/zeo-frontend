import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationCreationComponent } from './designation-creation.component';

describe('DesignationCreationComponent', () => {
  let component: DesignationCreationComponent;
  let fixture: ComponentFixture<DesignationCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignationCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesignationCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
