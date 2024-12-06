import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPolicyComponent } from './company-policy.component';

describe('CompanyPolicyComponent', () => {
  let component: CompanyPolicyComponent;
  let fixture: ComponentFixture<CompanyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
