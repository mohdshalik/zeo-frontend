import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDialogComponent } from './general-dialog.component';

describe('GeneralDialogComponent', () => {
  let component: GeneralDialogComponent;
  let fixture: ComponentFixture<GeneralDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
