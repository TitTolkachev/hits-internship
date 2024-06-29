import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanUserComponent } from './dean-user.component';

describe('DeanUserComponent', () => {
  let component: DeanUserComponent;
  let fixture: ComponentFixture<DeanUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeanUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeanUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
