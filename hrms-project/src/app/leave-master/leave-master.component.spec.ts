import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMasterComponent } from './leave-master.component';

describe('LeaveMasterComponent', () => {
  let component: LeaveMasterComponent;
  let fixture: ComponentFixture<LeaveMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
