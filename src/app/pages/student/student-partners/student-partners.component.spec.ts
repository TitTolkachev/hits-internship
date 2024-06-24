import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPartnersComponent } from './student-partners.component';

describe('StudentPartnersComponent', () => {
  let component: StudentPartnersComponent;
  let fixture: ComponentFixture<StudentPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentPartnersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
