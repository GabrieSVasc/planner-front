import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Lembrete } from '../../models/lembrete';
import { LembreteService } from '../../services/lembrete.service';
import { SideMenu } from '../../side-menu/side-menu';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lembrete-list',
  imports: [CommonModule, DatePipe, SideMenu],
  templateUrl: './lembrete-list.html',
  styleUrl: './lembrete-list.css',
})
export class LembreteList implements OnInit {

  lembretes: Lembrete[] = [];

  constructor(
    private lembreteService: LembreteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(){
    this.lembretes = await this.lembreteService.getLembretes()
    this.cdr.detectChanges();
  }
  novoLembrete() {
    this.router.navigate(['/lembretes/novo']);
  }

  editarLembrete(id: number) {
    this.router.navigate(['/lembretes/editar', id]);
  }

  async excluirLembrete(id: number) {

    const confirmar = confirm('Deseja realmente excluir este lembrete?');

    if (confirmar) {
      this.lembreteService.deleteLembrete(id);
      this.lembretes = await this.lembreteService.getLembretes();
      this.cdr.detectChanges()
    }

  }

}