import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocExpEmailtemplateComponent } from './doc-exp-emailtemplate.component';

describe('DocExpEmailtemplateComponent', () => {
  let component: DocExpEmailtemplateComponent;
  let fixture: ComponentFixture<DocExpEmailtemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocExpEmailtemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocExpEmailtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
