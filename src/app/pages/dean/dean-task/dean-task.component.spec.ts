import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanTaskComponent } from './dean-task.component';

describe('DeanTaskComponent', () => {
  let component: DeanTaskComponent;
  let fixture: ComponentFixture<DeanTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeanTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeanTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
