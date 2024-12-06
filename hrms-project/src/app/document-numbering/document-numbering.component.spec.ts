import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentNumberingComponent } from './document-numbering.component';

describe('DocumentNumberingComponent', () => {
  let component: DocumentNumberingComponent;
  let fixture: ComponentFixture<DocumentNumberingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentNumberingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentNumberingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
