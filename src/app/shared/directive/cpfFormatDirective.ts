import {Directive, DoCheck, ElementRef, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[formatCpf]'
})
export class CpfFormatDirective implements DoCheck {

  constructor(public el: ElementRef, private control: NgControl) {}

  ngDoCheck(): void {
    this.format();
  }

  @HostListener('input', ['$event'])
  onInput(e): void {
    this.format();
  }

  private format(): void {
    const identificacao = this.el.nativeElement.value.replace(/[^0-9]/g, '');

    if (identificacao.length === 11) {
      this.control.valueAccessor.writeValue(identificacao.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4'));
    } else if (identificacao.length === 14) {
      this.control.valueAccessor.writeValue(identificacao.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5'));
    }
  }
}
