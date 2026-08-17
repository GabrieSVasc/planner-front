import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LembreteList } from './lembrete-list';

describe('LembreteList', () => {
  let component: LembreteList;
  let fixture: ComponentFixture<LembreteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LembreteList],
    }).compileComponents();

    fixture = TestBed.createComponent(LembreteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
