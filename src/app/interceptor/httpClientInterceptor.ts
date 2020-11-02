import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpClientInterceptor implements HttpClientInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else if (error.error && error.error.messageValidation) {
            const messages = Object['values'](error.error.messageValidation);
            for (const message of messages) {
              this.messageService.add({severity: 'error', detail: message.toString()});
            }
            return;
          } else {
            if (error.error.message) {
              errorMessage = `${error.error.message}`;
            } else {
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
          }
          this.messageService.add({severity: 'error', detail: errorMessage});
          return throwError(errorMessage);
        })
      );
  }
}
