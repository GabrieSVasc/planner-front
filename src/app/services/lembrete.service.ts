import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../core/api.config';
import { Lembrete } from '../models/lembrete';
import { AuthService } from './auth.service';
export interface NewLembrete{
  categoria_id: number,
  descricao: string,
  data_hora: string;
  recorrente: boolean;
  frequencia: "SEMANAL"| "DIARIA"| "MENSAL"| "ANUAL"| null;
  ativo: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  constructor(
    private authService: AuthService,
  ) {}

  async getLembretes(): Promise<Lembrete[]>{
    const id = await this.authService.perfil();
    const response = await fetch(`${API_BASE_URL}/lembretes/usuario/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      }
    });
    const dados = await response.json();
    return dados['data'];
  }

  async getLembreteById(id: number): Promise<Lembrete> {
    const response = await fetch(`${API_BASE_URL}/lembretes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      }
    });
    const data =await response.json();
    return data['data'];
  }

  async addLembrete(lembrete: NewLembrete){
    const response = await fetch(`${API_BASE_URL}/lembretes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      },
      body: JSON.stringify(lembrete)
    })
    return response.ok;
  }

  async updateLembrete(lembreteAtualizado: Lembrete){
    const response = await fetch(`${API_BASE_URL}/lembretes/${lembreteAtualizado.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      },
      body: JSON.stringify(lembreteAtualizado)
    });
    const data = await response.json()
    console.log(response.status)
    console.log(data)
    return response.ok;
  }

  async deleteLembrete(id: number){
    const response = await fetch(`${API_BASE_URL}/lembretes/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      }
    })
    return response.ok;
  }
}