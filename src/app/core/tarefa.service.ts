import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { API_BASE_URL } from './api.config';
import { Tarefa, TarefaPayload, TarefaResponse, TarefaStatus } from './tarefa.model';

@Injectable({ providedIn: 'root' })
export class TarefaService {
  private readonly http = inject(HttpClient);

  listar() {
    return this.http.get<Tarefa[]>(`${API_BASE_URL}/tarefas`);
  }

  listarPorStatus(status: TarefaStatus) {
    return this.http.get<Tarefa[]>(`${API_BASE_URL}/tarefas/status/${status}`);
  }

  criar(payload: TarefaPayload) {
    return this.http.post<TarefaResponse>(`${API_BASE_URL}/tarefas`, payload);
  }

  atualizar(id: number, payload: Partial<TarefaPayload>) {
    return this.http.patch<TarefaResponse>(`${API_BASE_URL}/tarefas/${id}`, payload);
  }

  excluir(id: number) {
    return this.http.delete<{ message: string }>(`${API_BASE_URL}/tarefas/${id}`);
  }
}
