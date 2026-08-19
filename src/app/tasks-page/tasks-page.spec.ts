import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { TarefaService } from '../core/tarefa.service';
import { TasksPage } from './tasks-page';

describe('TasksPage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPage],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            logout: () => undefined,
            usuario: signal(null),
          },
        },
        {
          provide: TarefaService,
          useValue: {
            listar: () => of([]),
            listarPorStatus: () => of([]),
            criar: () => of({ message: 'ok', tarefa: {} }),
            atualizar: () => of({ message: 'ok', tarefa: {} }),
            excluir: () => of({ message: 'ok' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
