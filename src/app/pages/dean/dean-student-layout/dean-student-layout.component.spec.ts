import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanStudentLayoutComponent } from './dean-student-layout.component';

describe('DeanStudentLayoutComponent', () => {
  let component: DeanStudentLayoutComponent;
  let fixture: ComponentFixture<DeanStudentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeanStudentLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeanStudentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
