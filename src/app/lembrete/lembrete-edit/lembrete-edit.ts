import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SideMenu } from '../../side-menu/side-menu';
import { Lembrete } from '../../models/lembrete';
import { LembreteService } from '../../services/lembrete.service';
import { Categoria } from '../../models/categoria';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-lembrete-edit',
  imports: [FormsModule, SideMenu],
  templateUrl: './lembrete-edit.html',
  styleUrl: './lembrete-edit.css',
})
export class LembreteEdit implements OnInit{

  categoria: Categoria = {
    id: 0,
    cor: '',
    nome: ''
  }
  lembrete: Lembrete = {
    id: 0,
    descricao: '',
    categoria: this.categoria,
    tipo: '',
    data_hora: '',
    recorrente: false,
    ativo: true,
    frequencia: null
  };
  data: string = ""
  hora: string = ""
  constructor(
    private lembreteService: LembreteService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const lembreteEncontrado = await this.lembreteService.getLembreteById(id);

    if (lembreteEncontrado) {
      this.lembrete = lembreteEncontrado;
      this.categoria = this.lembrete.categoria;
      const data_hora = this.lembrete.data_hora.split(" ");
      this.data = data_hora[0];
      this.hora = data_hora[1];
    }
    this.cdr.detectChanges();
  }

  async salvarLembrete() {
    this.lembrete.data_hora = this.data + " "+this.hora;
    const response = await this.lembreteService.updateLembrete(this.lembrete);
    if(response){
      this.router.navigate(['/lembretes']);
    }else{
      alert("Erro ao editar o lembrete");
    }
  }

  cancelar() {
    this.router.navigate(['/lembretes']);
  }

  naoRecorrente(){
    this.lembrete.frequencia = null;
  }
}