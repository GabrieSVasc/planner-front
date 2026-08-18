import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria-edit',
  imports: [FormsModule],
  templateUrl: './categoria-edit.html',
  styleUrl: './categoria-edit.css',
})
export class CategoriaEdit implements OnInit{

  categoria: Categoria = {
    id: 0,
    nome: '',
    cor: '#3B82F6'
  };

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const categoriaEncontrada = await this.categoriaService.getCategoriaById(id);

    if (categoriaEncontrada) {
      this.categoria = categoriaEncontrada;
      console.log(this.categoria);
      this.cdr.detectChanges();
    }else{
      alert("Erro ao buscar informações desta categoria");
      this.router.navigate(['/categorias']);
    }
  }

  async salvarCategoria() {
    const response = await this.categoriaService.updateCategoria(this.categoria.id, this.categoria.cor);
    if(response){
      this.router.navigate(['/categorias']);
    }else{
      alert("Erro ao atualizar a cor da categoria");
    }

  }

  cancelar() {
    this.router.navigate(['/categorias']);
  }

}