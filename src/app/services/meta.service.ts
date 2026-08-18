import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../core/api.config';
import { Meta } from '../models/meta';

export interface NewMeta{
  descricao: string;

  categoria_id: number;

  periodo: 'SEMANAL' | 'MENSAL' | 'ANUAL';

  status: 'EM_ANDAMENTO' | 'CUMPRIDA' | 'PARCIAL' | 'NAO_CUMPRIDA';

  data_inicio: string;
  
  data_fim: string;
}

export interface EditMetaI{
  descricao: string;
  periodo: 'SEMANAL' | 'MENSAL' | 'ANUAL';
  status: 'EM_ANDAMENTO' | 'CUMPRIDA' | 'PARCIAL' | 'NAO_CUMPRIDA';
  data_inicio: string;
  data_fim: string;
}

@Injectable({
  providedIn: 'root'
})

export class MetaService {

  constructor() {}

  async getMetas(): Promise<Meta[]> {
    const response = await fetch(`${API_BASE_URL}/metas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('planner_token')
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar as metas');
    }

    const data = await response.json();

    return data['data'];
  }

  async getMeta(id: number): Promise<Meta>{
    const response = await fetch(`${API_BASE_URL}/metas/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      }
    });
    const data = await response.json();
    return data['data'];
  }

  async editMeta(meta: EditMetaI, id: number){
    const response = await fetch(`${API_BASE_URL}/metas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      },
      body: JSON.stringify(meta)
    })
    return response.ok;
  }

  async createMeta(meta: NewMeta){
    const response = await fetch(`${API_BASE_URL}/metas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      },
      body: JSON.stringify(meta)
    });
    return response.ok;
  }

  async removeMeta(id: number){
    const response = await fetch(`${API_BASE_URL}/metas/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      },
    })
    return response.ok;
  }
}