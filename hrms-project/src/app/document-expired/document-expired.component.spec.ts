import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentExpiredComponent } from './document-expired.component';

describe('DocumentExpiredComponent', () => {
  let component: DocumentExpiredComponent;
  let fixture: ComponentFixture<DocumentExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentExpiredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
