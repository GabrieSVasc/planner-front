import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoDia } from './resumo-dia';

describe('ResumoDia', () => {
  let component: ResumoDia;
  let fixture: ComponentFixture<ResumoDia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoDia],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumoDia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
