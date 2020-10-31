import { Component, OnInit } from '@angular/core';
import {Pessoa} from './pessoa';
import {PessoaService} from './pessoa.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa.form.component.html',
  styleUrls: ['./pessoa.form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  pessoa: Pessoa;
  urlUpload: string;
  constructor(private pessoaService: PessoaService,
              private route: ActivatedRoute,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.urlUpload = `${environment.url}/file/upload/pessoa/`;
    this.init();
  }

  public novo(): void {
    this.pessoa = new Pessoa();
  }

  private init(): void {
    this.novo();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        this.editar(params.id);
      }
    });
  }

  private editar(id: number): void {
    this.pessoaService.findOne(id)
      .subscribe(pessoa => {
        this.pessoa = pessoa;
        this.urlUpload += this.pessoa.id;
        });
  }

  public salvar(): void {
    this.pessoaService.save(this.pessoa)
      .subscribe(pessoa => {
          this.pessoa = pessoa;
          this.messageService.add({severity: 'success', detail: 'Registro salvo com sucesso!'});
        });
  }

  onUpload(event): void {
    this.pessoaService.findImage(this.pessoa.id)
      .subscribe(image => {
        if (image) {
          this.pessoa.image = image;
        }
      });
    this.messageService.add({severity: 'info', summary: 'Imagem atualizada com sucesso!', detail: ''});
  }

  onError(event): void {
    this.messageService.add({severity: 'error', summary: 'File Uploaded', detail: event});
  }

}
