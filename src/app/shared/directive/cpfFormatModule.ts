import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CpfFormatDirective} from './cpfFormatDirective';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CpfFormatDirective
  ],
  exports: [
    CpfFormatDirective
  ]
})
export class CpfFormatModule { }
