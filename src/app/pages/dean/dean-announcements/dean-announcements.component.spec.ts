import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanAnnouncementsComponent } from './dean-announcements.component';

describe('DeanAnnouncementsComponent', () => {
  let component: DeanAnnouncementsComponent;
  let fixture: ComponentFixture<DeanAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeanAnnouncementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeanAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
