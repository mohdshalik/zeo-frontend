import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WpsComponent } from './wps.component';

describe('WpsComponent', () => {
  let component: WpsComponent;
  let fixture: ComponentFixture<WpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WpsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
