import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDeanComponent } from './student-dean.component';

describe('StudentDeanComponent', () => {
  let component: StudentDeanComponent;
  let fixture: ComponentFixture<StudentDeanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentDeanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentDeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
