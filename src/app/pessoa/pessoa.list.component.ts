import {Component, Input, OnInit} from '@angular/core';
import {PessoaDto} from './pessoaDto';
import {PessoaService} from './pessoa.service';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {Observable} from 'rxjs';
import {Page} from '../core/page';
import {PessoaFiltro} from './pessoaFiltro';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa.list.component.html',
  styleUrls: ['./pessoa.list.component.scss']
})
export class PessoaListComponent implements OnInit {
  filtro: PessoaFiltro;
  pessoas: PessoaDto[];
  totalRecords: number;
  loading = false;

  constructor(private pessoaService: PessoaService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.pesquisar(null);
  }

  find(event: LazyLoadEvent): Observable<Page<PessoaDto>> {
    const rows = event ? event.rows : 10;
    const first = event ? event.first : 0;
    return this.pessoaService
      .findPageable(first / rows, rows, this.filtro);
  }

  load(event: LazyLoadEvent): void {
    setTimeout(() => this.loading = true);
    this.find(event).subscribe(e => {
      this.pessoas = e.content;
      this.totalRecords = e.totalElements;
    }, error => {
    }, () => setTimeout(() => this.loading = false));
  }

  pesquisar(filtro: PessoaFiltro): void {
    this.filtro = filtro;
    this.load(null);
  }

  remover(pessoa: PessoaDto, index: number): void {
    this.confirmationService.confirm({
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      header: 'Confirmação',
      message: `Deseja remover a pessoa ${pessoa.nome}?`,
      accept: () => {
        this.pessoaService.delete(pessoa.id).subscribe();
        this.pessoas.splice(index, 1);
      }
    });
  }
}
