import {Component, EventEmitter, Output} from '@angular/core';
import {PessoaFiltro} from '../pessoa/pessoaFiltro';

@Component({
  selector: 'app-pessoa-filtro',
  templateUrl: './pessoa.filtro.component.html'
})
export class PessoaFiltroComponent {
  filtro: PessoaFiltro;
  @Output('pesquisar') pesquisarEvent = new EventEmitter<PessoaFiltro>();
  @Output('limpar') limparEvent = new EventEmitter<null>();

  constructor() {
    this.filtro = new PessoaFiltro();
  }

  public pesquisar(): void {
    this.pesquisarEvent.emit(this.filtro);
  }

  public limpar(): void {
    this.filtro = new PessoaFiltro();
    this.limparEvent.emit(null);
  }

}
