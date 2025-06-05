import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAllocationComponent } from './asset-allocation.component';

describe('AssetAllocationComponent', () => {
  let component: AssetAllocationComponent;
  let fixture: ComponentFixture<AssetAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetAllocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
