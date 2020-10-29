import { Component, OnInit } from '@angular/core';
import {Pessoa} from './pessoa';
import {PessoaService} from './pessoa.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa.form.component.html',
  styleUrls: ['./pessoa.form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  pessoa: Pessoa;
  urlUpload = `${environment.url}/pessoa/upload/`;

  constructor(private pessoaService: PessoaService,
              private route: ActivatedRoute,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.init();
  }

  public novo(): void {
    this.pessoa = new Pessoa();
  }

  private init(): void {
    this.route.params.subscribe( params => {
      if (params && params.id) {
        this.editar(params.id);
      } else {
        this.novo();
      }
    });
  }

  private editar(id: number): void {
    this.pessoaService.findOne(id).subscribe(pessoa => {
      this.pessoa = pessoa;
      this.urlUpload += this.pessoa.id;
    });
  }

  public salvar(): void {
    this.pessoaService.save(this.pessoa)
      .subscribe(pessoa => this.pessoa = pessoa,
        error => this.messageService.add({severity: 'error', detail: error.message}),
        () => this.messageService.add({severity: 'success', detail: 'Registro salvo com sucesso!'}));
  }

  onUpload(event): void {
    console.log(event);

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
}
