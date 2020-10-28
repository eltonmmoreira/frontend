import { Injectable } from '@angular/core';
import {CrudService} from '../core/crud.service';
import {Pessoa} from './pessoa';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';

@Injectable()
export class PessoaService extends CrudService<Pessoa, number> {

  constructor(httpClient: HttpClient) {
    super(`${environment.url}/pessoa`, httpClient);
  }

  findAll(): Observable<Pessoa[]> {
    const p = new Pessoa();
    p.nome = 'Elton';
    p.email = 'eltonmmoreira@gmail.com';
    p.cpf = '06766490926';
    p.dataDeNascimento = new Date(1987, 6, 13);

    const p2 = new Pessoa();
    p2.nome = 'Elton2';
    p2.email = 'teste@gmail.com';
    p2.cpf = '06766490926';
    p2.dataDeNascimento = new Date(2011, 9, 16);

    const p3 = new Pessoa();
    p3.nome = 'Elton2';
    p3.email = 'dsfdsfsa@gmail.com';
    p3.cpf = '06766490926';
    p3.dataDeNascimento = new Date(1990, 3, 4);
    return of([p, p2, p3]);
  }

}
