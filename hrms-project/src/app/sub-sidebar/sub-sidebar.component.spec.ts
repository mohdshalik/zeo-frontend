import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSidebarComponent } from './sub-sidebar.component';

describe('SubSidebarComponent', () => {
  let component: SubSidebarComponent;
  let fixture: ComponentFixture<SubSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
