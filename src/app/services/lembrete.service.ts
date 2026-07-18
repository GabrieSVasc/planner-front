import { Injectable } from '@angular/core';

import { Lembrete } from '../models/lembrete';
import { MOCK_LEMBRETES } from '../mock/lembretes.mock';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  private lembretes: Lembrete[] = [...MOCK_LEMBRETES];

  constructor() {}

  getLembretes(): Lembrete[] {
    return this.lembretes;
  }

  getLembreteById(id: number): Lembrete | undefined {
    return this.lembretes.find(l => l.id === id);
  }

  addLembrete(lembrete: Lembrete): void {
    this.lembretes.push(lembrete);
  }

  updateLembrete(lembreteAtualizado: Lembrete): void {
    const index = this.lembretes.findIndex(l => l.id === lembreteAtualizado.id);

    if (index !== -1) {
      this.lembretes[index] = lembreteAtualizado;
    }
  }

  deleteLembrete(id: number): void {
    this.lembretes = this.lembretes.filter(l => l.id !== id);
  }

}