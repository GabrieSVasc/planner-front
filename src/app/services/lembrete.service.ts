import { Injectable } from '@angular/core';

import { Lembrete } from '../models/lembrete';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  constructor() {}

  getLembretes(){
  }

  getLembreteById(id: number) {
  }

  addLembrete(lembrete: Lembrete): void {
  }

  updateLembrete(lembreteAtualizado: Lembrete): void {
  }

  deleteLembrete(id: number): void {
  }
}