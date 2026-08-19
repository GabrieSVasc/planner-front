import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../core/api.config';
import { Categoria } from '../models/tarefa.model';
export interface RelatoriosMetasTarefas{
  cumpridas: number,
  porcentagem: number,
  total: number
}

export interface Turno{
  turno: "MANHA"|"TARDE"|"NOITE",
  total: number
}

export interface RelatorioCategoria{
  categoria: Categoria,
  total: number
}

export interface SemanaProdutiva{
  semana: number,
  total: number
}

export interface MesProdutivo{
  mes: number,
  total: number
}

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  baseUrl = API_BASE_URL+"/relatorios";
  
  async getRelatorioMetas(): Promise<RelatoriosMetasTarefas>{
      const response = await fetch(this.baseUrl+"/metas", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('planner_token')
        }
      });
      const data = await response.json();
      return data;
  }

  async getRelatorioTarefas(): Promise<RelatoriosMetasTarefas>{
      const response = await fetch(this.baseUrl+"/tarefas", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('planner_token')
        }
      });
      const data = await response.json();
      return data;
  }

  async getRelatorioCatMetas(): Promise<RelatorioCategoria[]>{
      const response = await fetch(this.baseUrl+"/categorias/metas", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('planner_token')
        }
      });
      const data = await response.json();
      return data['categorias'];
  }

  async getRelatorioCatTarefas(): Promise<RelatorioCategoria[]>{
      const response = await fetch(this.baseUrl+"/categorias/tarefas", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('planner_token')
        }
      });
      const data = await response.json();
      return data['categorias'];
  }

  async getRelatorioProdSemana(): Promise<SemanaProdutiva[]>{
      const response = await fetch(this.baseUrl+"/produtivo/semana", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('planner_token')
        }
      });
      const data = await response.json();
      return data['semanas'];
  }

  async getRelatorioProdMes(): Promise<MesProdutivo[]>{
      const response = await fetch(this.baseUrl+"/produtivo/mes", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('planner_token')
        }
      });
      const data = await response.json();
      return data['meses'];
  }

  async getRelatorioProdTurno(): Promise<Turno[]>{
      const response = await fetch(this.baseUrl+"/produtivo/turno", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('planner_token')
        }
      });
      const data = await response.json();
      return data['turnos'];
  }
}
