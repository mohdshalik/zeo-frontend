import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatogaryMasterComponent } from './catogary-master.component';

describe('CatogaryMasterComponent', () => {
  let component: CatogaryMasterComponent;
  let fixture: ComponentFixture<CatogaryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatogaryMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatogaryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
