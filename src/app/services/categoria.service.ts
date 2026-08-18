import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../core/api.config';
import { Categoria } from '../models/categoria';
import { HttpClient } from '@angular/common/http';

export interface NovaCategoria{
  nome: string,
  cor: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly http = inject(HttpClient);

  constructor() {}

  async getCategorias(): Promise<Categoria[]> {
    const response = await fetch(`${API_BASE_URL}/categorias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      }
    });
    if(!response.ok){
      throw new Error('Erro ao buscar categorias')
    }

    return await response.json();
  }

  async getCategoriaById(id: number): Promise<Categoria | undefined> {
    const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      }
    });
    const data = await response.json();
    if(response.ok){
      const categoria: Categoria = {
        id: data.id,
        nome: data.nome,
        cor: data.cor
      }
      return categoria;
    }else{
      return undefined;
    }
  }

  async addCategoria(categoria: NovaCategoria){
    const response = await fetch(`${API_BASE_URL}/categorias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      },
      body: JSON.stringify(categoria)
    });
    return response.ok;
  }

  async updateCategoria(id: number, novaCor: string) {
    const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      },
      body: JSON.stringify({cor: novaCor}) 
    });
    return response.ok;
  }
  async deleteCategoria(id: number){
    const response = await fetch(`${API_BASE_URL}/categorias/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('planner_token')
      },
    });
    return response.ok;
  }
}