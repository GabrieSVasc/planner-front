import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoSemana } from './resumo-semana';

describe('ResumoSemana', () => {
  let component: ResumoSemana;
  let fixture: ComponentFixture<ResumoSemana>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoSemana],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumoSemana);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
