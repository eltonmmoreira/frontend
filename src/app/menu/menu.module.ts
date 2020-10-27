import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarModule} from 'primeng/sidebar';
import {RouterModule} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MenuComponent} from './menu.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
    MatIconModule,
    RouterModule,
    ButtonModule
  ],
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule {

}
