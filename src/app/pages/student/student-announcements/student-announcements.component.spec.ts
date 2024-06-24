import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAnnouncementsComponent } from './student-announcements.component';

describe('StudentAnnouncementsComponent', () => {
  let component: StudentAnnouncementsComponent;
  let fixture: ComponentFixture<StudentAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAnnouncementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
