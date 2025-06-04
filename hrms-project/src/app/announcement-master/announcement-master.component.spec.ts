import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementMasterComponent } from './announcement-master.component';

describe('AnnouncementMasterComponent', () => {
  let component: AnnouncementMasterComponent;
  let fixture: ComponentFixture<AnnouncementMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnouncementMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnouncementMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
