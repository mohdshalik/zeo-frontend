import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromDesignerComponent } from './from-designer.component';

describe('FromDesignerComponent', () => {
  let component: FromDesignerComponent;
  let fixture: ComponentFixture<FromDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FromDesignerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FromDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
