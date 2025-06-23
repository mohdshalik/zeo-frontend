import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRequestLevelComponent } from './document-request-level.component';

describe('DocumentRequestLevelComponent', () => {
  let component: DocumentRequestLevelComponent;
  let fixture: ComponentFixture<DocumentRequestLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentRequestLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentRequestLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
