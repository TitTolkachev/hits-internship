import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanComponent } from './dean.component';

describe('DeanComponent', () => {
  let component: DeanComponent;
  let fixture: ComponentFixture<DeanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
