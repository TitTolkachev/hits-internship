import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanUsersComponent } from './dean-users.component';

describe('DeanUsersComponent', () => {
  let component: DeanUsersComponent;
  let fixture: ComponentFixture<DeanUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeanUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeanUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
