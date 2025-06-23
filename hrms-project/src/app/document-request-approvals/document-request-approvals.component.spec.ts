import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRequestApprovalsComponent } from './document-request-approvals.component';

describe('DocumentRequestApprovalsComponent', () => {
  let component: DocumentRequestApprovalsComponent;
  let fixture: ComponentFixture<DocumentRequestApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentRequestApprovalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentRequestApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
