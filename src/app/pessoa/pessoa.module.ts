import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PessoaFormComponent} from './pessoa.form.component';
import {PessoaListComponent} from './pessoa.list.component';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {PessoaService} from './pessoa.service';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {PessoaFiltroModule} from '../component/pessoa.filtro.module';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      SharedModule,
      TableModule,
      CardModule,
      FormsModule,
      CalendarModule,
      InputTextModule,
      ButtonModule,
      PessoaFiltroModule,
      ToastModule,
      FileUploadModule
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
