import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanHeaderComponent } from './dean-header.component';

describe('DeanHeaderComponent', () => {
  let component: DeanHeaderComponent;
  let fixture: ComponentFixture<DeanHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeanHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeanHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
