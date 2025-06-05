import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetOptionsComponent } from './asset-options.component';

describe('AssetOptionsComponent', () => {
  let component: AssetOptionsComponent;
  let fixture: ComponentFixture<AssetOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
