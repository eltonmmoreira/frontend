import {Component, Input, OnInit} from '@angular/core';
import {PessoaDto} from './pessoaDto';
import {PessoaService} from './pessoa.service';
import {LazyLoadEvent} from 'primeng/api';
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

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {
    this.pesquisar(null);
  }

  protected find(event: LazyLoadEvent): Observable<Page<PessoaDto>> {
    const rows = event ? event.rows : 10;
    const first = event ? event.first : 0;
    return this.pessoaService
      .findPageable(first / rows, rows, this.filtro);
  }

  public load(event: LazyLoadEvent): void {
    setTimeout(() => this.loading = true);
    this.find(event).subscribe(e => {
      this.pessoas = e.content;
      this.totalRecords = e.totalElements;
    }, error => {
    }, () => setTimeout(() => this.loading = false));
  }

  public pesquisar(filtro: PessoaFiltro): void {
    this.filtro = filtro;
    this.load(null);
  }

  remover(rowData: any, rowIndex: any): void {

  }
}
