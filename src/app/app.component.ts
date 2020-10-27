import { Component } from '@angular/core';
import {MenuService} from './menu/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private menuService: MenuService) {
  }

  showMenu(): void {
    this.menuService.showMenuEmit();
  }
}
