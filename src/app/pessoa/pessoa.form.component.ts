import {Component, OnInit} from '@angular/core';
import {Pessoa} from './pessoa';
import {PessoaService} from './pessoa.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {environment} from '../../environments/environment';
import {UrlUtil} from '../util/urlUtil';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa.form.component.html',
  styleUrls: ['./pessoa.form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  urlUpload: string;
  baseUrl = `${environment.url}/file/upload/pessoa/`;

  constructor(private pessoaService: PessoaService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.init();
  }

  novo(): void {
    this.pessoa = new Pessoa();
    const url = UrlUtil.urlContainsForm(this.router.url)
      ? UrlUtil.getAtForm(this.router.url)
      : this.router.url;
    this.location.go(url);
  }

  init(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params && params.id) {
        this.editar(params.id);
      } else {
        this.novo();
      }
    });
  }

  editar(id: number): void {
    this.pessoaService.findOne(id)
      .subscribe(pessoa => {
        this.pessoa = pessoa;
        this.atualizarUrlUpload();
      });
  }

  atualizarUrlUpload(): void {
    this.urlUpload = this.baseUrl + this.pessoa.id;
  }

  salvar(): void {
    this.pessoaService.save(this.pessoa)
      .subscribe(pessoa => {
        const id = this.pessoa.id;
        this.pessoa = pessoa;
        this.messageService.add({severity: 'success', detail: 'Registro salvo com sucesso!'});

        if (!id) {
          this.atualizarUrlUpload();
          this.location.go(UrlUtil.getAtForm(this.router.url) + '/' + this.pessoa.id);
        }
      });
  }

  onUpload(event): void {
    this.pessoaService.findImage(this.pessoa.id)
      .subscribe(image => {
        if (image) {
          this.pessoa.image = image;
          this.pessoa.temImagem = true;
        }
      });
    this.messageService.add({severity: 'info', summary: 'Imagem atualizada com sucesso!', detail: ''});
  }

  onError(event): void {
    this.messageService.add({severity: 'error', summary: 'File Uploaded', detail: event});
  }

}
