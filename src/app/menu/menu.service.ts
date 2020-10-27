import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class MenuService {

  showMenu: EventEmitter<void> = new EventEmitter<void>();

  showMenuEmit(): void {
    this.showMenu.emit();
  }

  showMenuObservable(): Observable<void> {
    return this.showMenu.asObservable();
  }

}
