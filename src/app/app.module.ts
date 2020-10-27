import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MenuService} from './menu/menu.service';
import {ConfirmationService} from 'primeng/api';
import {MenuModule} from './menu/menu.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {ButtonModule} from 'primeng/button';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    MenuModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule
  ],
  providers: [
    MenuService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
