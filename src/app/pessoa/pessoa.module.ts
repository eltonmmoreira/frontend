import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PessoaFormComponent} from './pessoa.form.component';
import {PessoaListComponent} from './pessoa.list.component';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {PessoaService} from './pessoa.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TableModule,
    CardModule
  ],
  declarations: [
    PessoaFormComponent,
    PessoaListComponent
  ],
  exports: [
    PessoaFormComponent,
    PessoaListComponent
  ],
  providers: [PessoaService],
})
export class PessoaModule {

}
