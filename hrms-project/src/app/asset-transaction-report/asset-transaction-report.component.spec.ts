import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTransactionReportComponent } from './asset-transaction-report.component';

describe('AssetTransactionReportComponent', () => {
  let component: AssetTransactionReportComponent;
  let fixture: ComponentFixture<AssetTransactionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetTransactionReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetTransactionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
