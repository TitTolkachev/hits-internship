import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTasksComponent } from './student-tasks.component';

describe('StudentTasksComponent', () => {
  let component: StudentTasksComponent;
  let fixture: ComponentFixture<StudentTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
