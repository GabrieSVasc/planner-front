import { Injectable } from '@angular/core';

import { Meta } from '../models/meta';
import { MOCK_METAS } from '../mock/metas.mock';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor() {}

  getMetas(): Meta[] {
    return MOCK_METAS;
  }
}