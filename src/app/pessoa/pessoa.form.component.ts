import {Component, OnInit, ViewChild} from '@angular/core';
import {Pessoa} from './pessoa';
import {PessoaService} from './pessoa.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {environment} from '../../environments/environment';
import {UrlUtil} from '../util/urlUtil';
import {FormControl, NgForm} from '@angular/forms';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa.form.component.html',
  styleUrls: ['./pessoa.form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  @ViewChild(NgForm, {static: false}) public form: NgForm;
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
    this.inicializarForm();
    this.pessoa = new Pessoa();
    const url = UrlUtil.urlContainsForm(this.router.url)
      ? UrlUtil.getAtForm(this.router.url)
      : this.router.url;
    this.location.go(url);
  }

  inicializarForm(): void {
    const form = this.form;
    for (const eachControl in form.controls) {
      (<FormControl>form.controls[eachControl]).reset();
      (<FormControl>form.controls[eachControl]).markAsUntouched();
      (<FormControl>form.controls[eachControl]).markAsPristine();
      (<FormControl>form.controls[eachControl]).updateValueAndValidity();
    }
    form.resetForm();
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
    if (!this.validarForm()) {
      return;
    }
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

  validarForm(): boolean {
    if (!this.form.valid) {
      const form = this.form;
      for (const eachControl in form.controls) {
        (<FormControl>form.controls[eachControl]).markAsDirty();
        (<FormControl>form.controls[eachControl]).updateValueAndValidity();
      }
      return false;
    }
    return true;
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
