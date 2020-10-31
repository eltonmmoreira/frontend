import {Injectable} from '@angular/core';
import {CrudService} from '../core/crud.service';
import {Pessoa} from './pessoa';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class PessoaService extends CrudService<Pessoa, number> {

  constructor(httpClient: HttpClient) {
    super(`${environment.url}/pessoa`, httpClient);
  }

  public findImage(id: number): Observable<string> {
    const url = `${environment.url}/file/pessoa/${id}`;
    return this.http.get<string>(url, {responseType: 'text' as 'json'});
  }

}
