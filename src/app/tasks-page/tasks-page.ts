import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TarefaService } from '../services/tarefa.service';
import { Categoria } from '../models/categoria';
import { Tarefa, TarefaPayload, TarefaPrioridade, TarefaStatus, TarefaTurno } from '../models/tarefa.model';
import { SideMenu } from '../side-menu/side-menu';
import { CategoriaService } from '../services/categoria.service';

type Filtro = 'TODAS' | TarefaStatus;
type FiltroPrioridade = 'TODAS' | TarefaPrioridade;
type FiltroTurno = 'TODOS' | TarefaTurno;

@Component({
  selector: 'app-tasks-page',
  imports: [CommonModule, ReactiveFormsModule, SideMenu],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPage implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly tarefaService = inject(TarefaService);
  private readonly categoriaService =inject(CategoriaService);
  private pageMessageTimer: ReturnType<typeof setTimeout> | null = null;
  private modalMessageTimer: ReturnType<typeof setTimeout> | null = null;

  readonly prioridadeOptions: TarefaPrioridade[] = ['ALTA', 'MEDIA', 'BAIXA'];
  readonly turnoOptions: TarefaTurno[] = ['MANHA', 'TARDE', 'NOITE'];
  readonly filtroOptions: Filtro[] = ['TODAS', 'NAO_CUMPRIDA', 'PARCIAL', 'CUMPRIDA'];
  readonly filtroPrioridadeOptions: FiltroPrioridade[] = ['TODAS', 'ALTA', 'MEDIA', 'BAIXA'];
  readonly filtroTurnoOptions: FiltroTurno[] = ['TODOS', 'MANHA', 'TARDE', 'NOITE'];

  readonly tarefaForm = this.formBuilder.group({
    id: this.formBuilder.control<number | null>(null),
    categoria_id: this.formBuilder.control<number | null>(null),
    descricao: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(255)]),
    data: this.formBuilder.nonNullable.control('', [Validators.required]),
    hora_inicio: this.formBuilder.nonNullable.control('', [Validators.required]),
    hora_fim: this.formBuilder.nonNullable.control('', [Validators.required]),
    turno: this.formBuilder.nonNullable.control<TarefaTurno>('MANHA', [Validators.required]),
    prioridade: this.formBuilder.nonNullable.control<TarefaPrioridade>('MEDIA', [Validators.required]),
  }, {
    validators: [TasksPage.validarIntervaloHorario],
  });

  readonly todasAsTarefas = signal<Tarefa[]>([]);
  readonly filtroAtivo = signal<Filtro>('TODAS');
  readonly filtroPrioridadeAtivo = signal<FiltroPrioridade>('TODAS');
  readonly filtroTurnoAtivo = signal<FiltroTurno>('TODOS');
  readonly carregando = signal(false);
  readonly salvando = signal(false);
  readonly erroPagina = signal('');
  readonly sucessoPagina = signal('');
  readonly erroModal = signal('');
  readonly sucessoModal = signal('');
  readonly modalAberto = signal(false);
  readonly tarefas = computed(() => {
    const filtroStatus = this.filtroAtivo();
    const filtroPrioridade = this.filtroPrioridadeAtivo();
    const filtroTurno = this.filtroTurnoAtivo();
    const tarefas = this.todasAsTarefas();

    return tarefas.filter((tarefa) => {
      const statusOk = filtroStatus === 'TODAS' || tarefa.status === filtroStatus;
      const prioridadeOk = filtroPrioridade === 'TODAS' || tarefa.prioridade === filtroPrioridade;
      const turnoOk = filtroTurno === 'TODOS' || tarefa.turno === filtroTurno;

      return statusOk && prioridadeOk && turnoOk;
    });
  });
  readonly categoriasDisponiveis = signal<Categoria[]>([]);

  async ngOnInit() {
    this.carregarTarefas();
    const categorias = await this.categoriaService.getCategorias();
    this.categoriasDisponiveis.set(
      categorias.sort((a,b)=>a.nome.localeCompare(b.nome))
    );
    console.log(categorias);
  }

  carregarTarefas(): void {
    this.carregando.set(true);

    this.tarefaService.listar().pipe(
      finalize(() => {
        this.carregando.set(false);
      }),
    ).subscribe({
      next: (tarefas) => {
        this.todasAsTarefas.set(Array.isArray(tarefas) ? tarefas : []);
      },
      error: (error) => {
        this.definirErroPagina(error.error?.message ?? 'Nao foi possivel carregar as tarefas.');
      },
    });
  }

  selecionarFiltro(status: Filtro): void {
    this.filtroAtivo.set(status);
  }

  selecionarFiltroPrioridade(prioridade: FiltroPrioridade): void {
    this.filtroPrioridadeAtivo.set(prioridade);
  }

  selecionarFiltroTurno(turno: FiltroTurno): void {
    this.filtroTurnoAtivo.set(turno);
  }

  limparFiltros(): void {
    this.filtroAtivo.set('TODAS');
    this.filtroPrioridadeAtivo.set('TODAS');
    this.filtroTurnoAtivo.set('TODOS');
  }

  rotuloFiltro(status: Filtro): string {
    switch (status) {
      case 'TODAS':
        return 'Todas';
      case 'NAO_CUMPRIDA':
        return 'Pendentes';
      case 'PARCIAL':
        return 'Em andamento';
      case 'CUMPRIDA':
        return 'Concluidas';
    }
  }

  rotuloFiltroPrioridade(prioridade: FiltroPrioridade): string {
    switch (prioridade) {
      case 'TODAS':
        return 'Todas prioridades';
      case 'ALTA':
        return 'Alta';
      case 'MEDIA':
        return 'Media';
      case 'BAIXA':
        return 'Baixa';
    }
  }

  rotuloFiltroTurno(turno: FiltroTurno): string {
    switch (turno) {
      case 'TODOS':
        return 'Todos turnos';
      case 'MANHA':
        return 'Manha';
      case 'TARDE':
        return 'Tarde';
      case 'NOITE':
        return 'Noite';
    }
  }

  rotuloStatus(status: TarefaStatus): string {
    switch (status) {
      case 'NAO_CUMPRIDA':
        return 'Pendente';
      case 'PARCIAL':
        return 'Em andamento';
      case 'CUMPRIDA':
        return 'Concluida';
    }
  }

  rotuloPrioridade(prioridade: TarefaPrioridade): string {
    switch (prioridade) {
      case 'ALTA':
        return 'Alta';
      case 'MEDIA':
        return 'Media';
      case 'BAIXA':
        return 'Baixa';
    }
  }

  rotuloTurno(turno: TarefaTurno): string {
    switch (turno) {
      case 'MANHA':
        return 'Manha';
      case 'TARDE':
        return 'Tarde';
      case 'NOITE':
        return 'Noite';
    }
  }

  mensagemErroCampo(campo: 'descricao' | 'data' | 'hora_inicio' | 'hora_fim'): string {
    const control = this.tarefaForm.controls[campo];

    if (!control.touched && !control.dirty) {
      return '';
    }

    if (control.hasError('required')) {
      switch (campo) {
        case 'descricao':
          return 'Informe a descricao da tarefa.';
        case 'data':
          return 'Selecione uma data.';
        case 'hora_inicio':
          return 'Informe a hora de inicio.';
        case 'hora_fim':
          return 'Informe a hora de fim.';
      }
    }

    if (campo === 'descricao' && control.hasError('maxlength')) {
      return 'A descricao pode ter no maximo 255 caracteres.';
    }

    if (campo === 'hora_fim' && this.tarefaForm.hasError('intervaloInvalido')) {
      return 'A hora de fim deve ser posterior a hora de inicio.';
    }

    return '';
  }

  campoInvalido(campo: 'descricao' | 'data' | 'hora_inicio' | 'hora_fim'): boolean {
    return this.mensagemErroCampo(campo) !== '';
  }

  descricaoCategoriaSelecionada(): string {
    const categoriaId = this.tarefaForm.controls.categoria_id.value;

    if (!categoriaId) {
      return 'Nenhuma categoria selecionada.';
    }

    const categoria = this.categoriasDisponiveis().find((item) => item.id === categoriaId);
    return categoria ? categoria.nome : 'Categoria selecionada';
  }

  salvarTarefa(): void {
    if (this.tarefaForm.invalid || this.salvando()) {
      this.tarefaForm.markAllAsTouched();
      return;
    }

    this.salvando.set(true);
    this.limparMensagemModal();

    const { id, ...rawPayload } = this.tarefaForm.getRawValue();
    const payload: TarefaPayload = {
      ...rawPayload,
      categoria_id: rawPayload.categoria_id ?? null,
    };

    const request$ = id
      ? this.tarefaService.atualizar(id, payload)
      : this.tarefaService.criar(payload);

    request$.pipe(
      finalize(() => {
        this.salvando.set(false);
      }),
    ).subscribe({
      next: (response) => {
        this.sincronizarTarefa(response.tarefa);
        this.definirSucessoPagina(response.message);
        this.fecharModal();
      },
      error: (error) => {
        this.definirErroModal(
          error.error?.message ?? this.primeiroErroValidacao(error) ?? 'Nao foi possivel salvar a tarefa.',
        );
      },
    });
  }

  editarTarefa(tarefa: Tarefa): void {
    this.tarefaForm.patchValue({
      id: tarefa.id,
      categoria_id: tarefa.categoria_id,
      descricao: tarefa.descricao,
      data: tarefa.data,
      hora_inicio: tarefa.hora_inicio.slice(0, 5),
      hora_fim: tarefa.hora_fim.slice(0, 5),
      turno: tarefa.turno,
      prioridade: tarefa.prioridade,
    });
    this.limparMensagemModal();
    this.modalAberto.set(true);
  }

  excluirTarefa(id: number): void {
    this.limparMensagemPagina();

    this.tarefaService.excluir(id).subscribe({
      next: (response) => {
        this.removerTarefa(id);
        this.definirSucessoPagina(response.message);
        if (this.tarefaForm.value.id === id) {
          this.resetarFormulario();
        }
      },
      error: (error) => {
        this.definirErroPagina(error.error?.message ?? 'Nao foi possivel excluir a tarefa.');
      },
    });
  }

  concluirTarefa(tarefa: Tarefa): void {
    const novoStatus: TarefaStatus = tarefa.status === 'CUMPRIDA' ? 'NAO_CUMPRIDA' : 'CUMPRIDA';

    this.atualizarStatusTarefa(tarefa, novoStatus);
  }

  atualizarStatusTarefa(tarefa: Tarefa, status: TarefaStatus): void {
    if (tarefa.status === status) {
      return;
    }

    this.tarefaService.atualizar(tarefa.id, { status }).subscribe({
      next: (response) => {
        this.sincronizarTarefa(response.tarefa);
        this.definirSucessoPagina(response.message);
      },
      error: (error) => {
        this.definirErroPagina(error.error?.message ?? 'Nao foi possivel atualizar a tarefa.');
      },
    });
  }

  resetarFormulario(): void {
    this.tarefaForm.reset({
      id: null,
      categoria_id: null,
      descricao: '',
      data: '',
      hora_inicio: '',
      hora_fim: '',
      turno: 'MANHA',
      prioridade: 'MEDIA',
    });
  }

  abrirModalCriacao(): void {
    this.resetarFormulario();
    this.limparMensagemModal();
    this.modalAberto.set(true);
  }

  fecharModal(): void {
    this.modalAberto.set(false);
    this.limparMensagemModal();
    this.resetarFormulario();
  }

  sair(): void {
    this.authService.logout();
  }

  private sincronizarTarefa(tarefaAtualizada: Tarefa): void {
    const tarefas = this.todasAsTarefas();
    const indice = tarefas.findIndex((tarefa) => tarefa.id === tarefaAtualizada.id);

    if (indice === -1) {
      this.todasAsTarefas.set([tarefaAtualizada, ...tarefas]);
    } else {
      this.todasAsTarefas.set(tarefas.map((tarefa) =>
        tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa,
      ));
    }
  }

  private removerTarefa(id: number): void {
    this.todasAsTarefas.set(this.todasAsTarefas().filter((tarefa) => tarefa.id !== id));
  }

  private definirErroPagina(mensagem: string): void {
    this.erroPagina.set(mensagem);
    this.sucessoPagina.set('');
    this.agendarLimpezaMensagemPagina();
  }

  private definirSucessoPagina(mensagem: string): void {
    this.sucessoPagina.set(mensagem);
    this.erroPagina.set('');
    this.agendarLimpezaMensagemPagina();
  }

  private definirErroModal(mensagem: string): void {
    this.erroModal.set(mensagem);
    this.sucessoModal.set('');
    this.agendarLimpezaMensagemModal();
  }

  private limparMensagemPagina(): void {
    this.erroPagina.set('');
    this.sucessoPagina.set('');
    if (this.pageMessageTimer) {
      clearTimeout(this.pageMessageTimer);
      this.pageMessageTimer = null;
    }
  }

  private limparMensagemModal(): void {
    this.erroModal.set('');
    this.sucessoModal.set('');
    if (this.modalMessageTimer) {
      clearTimeout(this.modalMessageTimer);
      this.modalMessageTimer = null;
    }
  }

  private agendarLimpezaMensagemPagina(): void {
    if (this.pageMessageTimer) {
      clearTimeout(this.pageMessageTimer);
    }

    this.pageMessageTimer = setTimeout(() => {
      this.erroPagina.set('');
      this.sucessoPagina.set('');
      this.pageMessageTimer = null;
    }, 4000);
  }

  private agendarLimpezaMensagemModal(): void {
    if (this.modalMessageTimer) {
      clearTimeout(this.modalMessageTimer);
    }

    this.modalMessageTimer = setTimeout(() => {
      this.erroModal.set('');
      this.sucessoModal.set('');
      this.modalMessageTimer = null;
    }, 4000);
  }

  private primeiroErroValidacao(error: { error?: { errors?: Record<string, string[]> } }): string | null {
    const errors = error.error?.errors;

    if (!errors) {
      return null;
    }

    const primeiroCampo = Object.keys(errors)[0];
    return errors[primeiroCampo]?.[0] ?? null;
  }

  private static validarIntervaloHorario(control: AbstractControl): ValidationErrors | null {
    const horaInicio = control.get('hora_inicio')?.value;
    const horaFim = control.get('hora_fim')?.value;

    if (!horaInicio || !horaFim) {
      return null;
    }

    return horaFim > horaInicio ? null : { intervaloInvalido: true };
  }
}
