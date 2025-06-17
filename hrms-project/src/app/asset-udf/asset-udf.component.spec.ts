import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetUdfComponent } from './asset-udf.component';

describe('AssetUdfComponent', () => {
  let component: AssetUdfComponent;
  let fixture: ComponentFixture<AssetUdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetUdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetUdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
