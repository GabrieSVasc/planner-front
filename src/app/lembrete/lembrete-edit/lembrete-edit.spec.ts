import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LembreteEdit } from './lembrete-edit';

describe('LembreteEdit', () => {
  let component: LembreteEdit;
  let fixture: ComponentFixture<LembreteEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LembreteEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(LembreteEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
