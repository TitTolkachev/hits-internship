import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanStudentComponent } from './dean-student.component';

describe('DeanStudentComponent', () => {
  let component: DeanStudentComponent;
  let fixture: ComponentFixture<DeanStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeanStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeanStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
