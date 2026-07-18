import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Lembrete } from '../../models/lembrete';
import { LembreteService } from '../../services/lembrete.service';

@Component({
  selector: 'app-lembrete-edit',
  imports: [FormsModule],
  templateUrl: './lembrete-edit.html',
  styleUrl: './lembrete-edit.css',
})
export class LembreteEdit {

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
    private route: ActivatedRoute,
    private router: Router
  ) {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    const lembreteEncontrado = this.lembreteService.getLembreteById(id);

    if (lembreteEncontrado) {
      this.lembrete = { ...lembreteEncontrado };
    }

  }

  salvarLembrete() {
    this.lembreteService.updateLembrete(this.lembrete);
    this.router.navigate(['/lembretes']);
  }

  cancelar() {
    this.router.navigate(['/lembretes']);
  }

}