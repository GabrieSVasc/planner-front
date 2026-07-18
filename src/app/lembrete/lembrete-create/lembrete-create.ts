import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Lembrete } from '../../models/lembrete';
import { LembreteService } from '../../services/lembrete.service';

@Component({
  selector: 'app-lembrete-create',
  imports: [FormsModule],
  templateUrl: './lembrete-create.html',
  styleUrl: './lembrete-create.css',
})
export class LembreteCreate {

  lembrete: Lembrete = {
    id: 0,
    descricao: '',
    categoria: '',
    tipo: '',
    data: '',
    horario: '',
    recorrente: false
  };

  constructor(
    private lembreteService: LembreteService,
    private router: Router
  ) {}

  salvarLembrete() {

    const novoLembrete: Lembrete = {
      ...this.lembrete,
      id: Date.now()
    };

    this.lembreteService.addLembrete(novoLembrete);

    this.router.navigate(['/lembretes']);
  }

  cancelar() {
    this.router.navigate(['/lembretes']);
  }

}