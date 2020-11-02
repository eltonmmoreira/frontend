import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'primeng/api';
import {CardModule} from 'primeng/card';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {PessoaFiltroComponent} from './pessoa.filtro.component';
import {CpfFormatModule} from '../shared/directive/cpfFormatModule';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CardModule,
        FormsModule,
        CalendarModule,
        InputTextModule,
        ButtonModule,
        CpfFormatModule,
        RouterModule
    ],
  declarations: [
    PessoaFiltroComponent
  ],
  exports: [
    PessoaFiltroComponent
  ]
})
export class PessoaFiltroModule {

}
