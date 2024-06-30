import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdminComponent } from './student-admin.component';

describe('StudentAdminComponent', () => {
  let component: StudentAdminComponent;
  let fixture: ComponentFixture<StudentAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
