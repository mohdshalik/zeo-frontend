import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatogaryCrationComponent } from './catogary-cration.component';

describe('CatogaryCrationComponent', () => {
  let component: CatogaryCrationComponent;
  let fixture: ComponentFixture<CatogaryCrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatogaryCrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatogaryCrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
