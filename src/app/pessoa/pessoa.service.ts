import {Injectable} from '@angular/core';
import {CrudService} from '../core/crud.service';
import {Pessoa} from './pessoa';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class PessoaService extends CrudService<Pessoa, number> {

  constructor(httpClient: HttpClient) {
    super(`${environment.url}/pessoa`, httpClient);
  }

}
