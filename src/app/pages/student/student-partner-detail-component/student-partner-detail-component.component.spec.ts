import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPartnerDetailComponentComponent } from './student-partner-detail-component.component';

describe('StudentPartnerDetailComponentComponent', () => {
  let component: StudentPartnerDetailComponentComponent;
  let fixture: ComponentFixture<StudentPartnerDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentPartnerDetailComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentPartnerDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
