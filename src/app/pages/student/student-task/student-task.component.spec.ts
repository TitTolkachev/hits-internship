import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTaskComponent } from './student-task.component';

describe('StudentTaskComponent', () => {
  let component: StudentTaskComponent;
  let fixture: ComponentFixture<StudentTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
