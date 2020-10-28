import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from './page';

export abstract class CrudService<T, ID> {

  protected constructor(protected url: string, protected http: HttpClient) {
  }

  protected getUrl(): string {
    return this.url;
  }

  findAll(): Observable<T[]> {
    const url = `${this.getUrl()}`;
    return this.http.get<T[]>(url);
  }

  findPageable(page: number, size: number, filtro?: any): Observable<Page<T>> {
    page = parseInt('' + page);
    let url = `${this.getUrl()}/list?page=${page}&size=${size}`;
    url = encodeURI(url);

    return this.http.post<Page<T>>(url, (JSON.stringify(filtro) === "{}") ? null : filtro);
  }

  complete(query: string): Observable<T[]> {
    const url = `${this.getUrl()}/complete?query=${query}`;
    return this.http.get<T[]>(url);
  }

  findOne(id: ID): Observable<T> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get<T>(url);
  }

  save(t: T): Observable<T> {
    this.preSave(t);
    const url = `${this.getUrl()}`;
    if (t['id']) {
      return this.http.put<T>(url, t);
    }

    return this.http.post<T>(url, t);
  }

  preSave(t: T): void {
  }

  delete(id: ID): Observable<void> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete<void>(url);
  }

  inativar(id: ID): Observable<void> {
    const url = `${this.getUrl()}/inativar/${id}`;
    return this.http.post<void>(url, null);
  }

}
