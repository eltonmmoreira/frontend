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
        catchError((error: any) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else if (error?.error?.type) {
            this.tratarException(error);
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

  private tratarException(error: any): void {
    const type = error.error.type;
    if (type === 'MethodArgumentNotValidException') {
      const messages = Object.values(error?.error?.parameters);
      for (const message of messages) {
        this.messageService.add({severity: 'error', detail: message.toString()});
      }
    } else {
      this.messageService.add({severity: 'error', detail: error?.error?.message});
    }
  }
}
