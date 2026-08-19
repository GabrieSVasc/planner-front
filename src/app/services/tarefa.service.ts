import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../core/api.config';
import { Tarefa, TarefaPayload, TarefaResponse, TarefaStatus } from '../models/tarefa.model';

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
  async listarPorData(data: Date): Promise<Tarefa[]>{
    const response = await fetch(`${API_BASE_URL}/tarefas/data/${data.toISOString().slice(0, 10)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      }
    });
    if(!response.ok){
      throw new Error("Erro ao buscar tarefas na data: "+data.toString());
    }
    return await response.json();
  }
}
