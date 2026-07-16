import { Injectable } from '@angular/core';

import { Lembrete } from '../models/lembrete';
import { MOCK_LEMBRETES } from '../mock/lembretes.mock';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  constructor() {}

  getLembretes(): Lembrete[] {
    return MOCK_LEMBRETES;
  }
}