import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatogaryEditComponent } from './catogary-edit.component';

describe('CatogaryEditComponent', () => {
  let component: CatogaryEditComponent;
  let fixture: ComponentFixture<CatogaryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatogaryEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatogaryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
