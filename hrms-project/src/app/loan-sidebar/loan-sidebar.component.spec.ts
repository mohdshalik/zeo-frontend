import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSidebarComponent } from './loan-sidebar.component';

describe('LoanSidebarComponent', () => {
  let component: LoanSidebarComponent;
  let fixture: ComponentFixture<LoanSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
