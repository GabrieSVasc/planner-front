import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Lembrete } from '../../models/lembrete';
import { LembreteService } from '../../services/lembrete.service';

@Component({
  selector: 'app-lembrete-list',
  imports: [CommonModule, DatePipe],
  templateUrl: './lembrete-list.html',
  styleUrl: './lembrete-list.css',
})
export class LembreteList {

  lembretes: Lembrete[] = [];

  constructor(
    private lembreteService: LembreteService,
    private router: Router
  ) {
    this.lembretes = this.lembreteService.getLembretes();
  }

  novoLembrete() {
    this.router.navigate(['/lembretes/novo']);
  }

  editarLembrete(id: number) {
    this.router.navigate(['/lembretes/editar', id]);
  }

  excluirLembrete(id: number) {

    const confirmar = confirm('Deseja realmente excluir este lembrete?');

    if (confirmar) {
      this.lembreteService.deleteLembrete(id);
      this.lembretes = this.lembreteService.getLembretes();
    }

  }

}