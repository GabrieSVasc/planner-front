import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundUser } from './background-user';

describe('BackgroundUser', () => {
  let component: BackgroundUser;
  let fixture: ComponentFixture<BackgroundUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundUser],
    }).compileComponents();

    fixture = TestBed.createComponent(BackgroundUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
