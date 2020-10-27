import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MenuService} from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  displayMenu = false;

  showMenuSubscribe: Subscription;
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.showMenuSubscribe = this.menuService.showMenuObservable().subscribe(() => {
      this.displayMenu = !this.displayMenu;
    });
  }

  ngOnDestroy(): void {
    this.showMenuSubscribe.unsubscribe();
  }

}
