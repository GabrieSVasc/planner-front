import { Injectable } from '@angular/core';

import { Tarefa } from '../models/tarefa';
import { MOCK_TAREFAS } from '../mock/tarefas.mock';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor() {}

  getTarefas(): Tarefa[] {
    return MOCK_TAREFAS;
  }
}