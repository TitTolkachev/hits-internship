import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanTasksComponent } from './dean-tasks.component';

describe('DeanTasksComponent', () => {
  let component: DeanTasksComponent;
  let fixture: ComponentFixture<DeanTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeanTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeanTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
