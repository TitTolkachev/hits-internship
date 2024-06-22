import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanLayoutComponent } from './dean-layout.component';

describe('DeanLayoutComponent', () => {
  let component: DeanLayoutComponent;
  let fixture: ComponentFixture<DeanLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeanLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeanLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
