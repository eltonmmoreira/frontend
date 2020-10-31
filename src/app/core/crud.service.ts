import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from './page';

export abstract class CrudService<T, ID> {

  protected constructor(protected url: string, protected http: HttpClient) {
  }

  protected getUrl(): string {
    return this.url;
  }

  findPageable(page: number, size: number, filtro?: any): Observable<Page<T>> {
    page = parseInt('' + page);
    let url = `${this.getUrl()}/list?page=${page}&size=${size}`;
    url = encodeURI(url);

    return this.http.post<Page<T>>(url, (JSON.stringify(filtro) === "{}") ? null : filtro);
  }

  findOne(id: ID): Observable<T> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get<T>(url);
  }

  save(entity: T): Observable<T> {
    this.preSave(entity);
    const url = `${this.getUrl()}`;
    if (entity['id']) {
      return this.http.put<T>(url, entity);
    }

    return this.http.post<T>(url, entity);
  }

  preSave(entity: T): void {
  }

  delete(id: ID): Observable<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete<void>(url);
  }

}
