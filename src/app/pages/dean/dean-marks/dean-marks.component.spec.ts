import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanMarksComponent } from './dean-marks.component';

describe('DeanMarksComponent', () => {
  let component: DeanMarksComponent;
  let fixture: ComponentFixture<DeanMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeanMarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeanMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
