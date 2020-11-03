import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PessoaListComponent} from './pessoa/pessoa.list.component';
import {PessoaFormComponent} from './pessoa/pessoa.form.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pessoa/list', component: PessoaListComponent},
  {path: 'pessoa/form', component: PessoaFormComponent},
  {path: 'pessoa/form/:id', component: PessoaFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
